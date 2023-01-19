package com.noahele.mangaserver.utils.reader;

import com.google.common.collect.Streams;
import com.google.common.io.Files;
import com.noahele.mangaserver.exception.UnsupportedFormatException;
import com.noahele.mangaserver.utils.MangaPage;
import com.noahele.mangaserver.utils.NaturalOrder;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipFile;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.List;

public class ZipMangaReader extends MangaReader {
    private final ZipFile zipFile;
    private final List<ZipArchiveEntry> entries;

    public ZipMangaReader(String path) throws IOException {
        this.zipFile = new ZipFile(path);
        Enumeration<ZipArchiveEntry> entries = zipFile.getEntries();
        this.entries = Streams.stream(entries::asIterator)
                // remove directory entry
                .filter(entry -> !entry.isDirectory())
                // sort entries by name with natural order
                .sorted((e1, e2) -> NaturalOrder.compare(e1.getName(), e2.getName()))
                .toList();
    }

    @Override
    public int getNumOfPages() {
        return entries.size();
    }


    @Override
    public MangaPage getPage(int pageIndex) throws IOException {
        String ext = Files.getFileExtension(entries.get(pageIndex).getName()).toLowerCase();
        MediaType mediaType = switch (ext) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "png" -> MediaType.IMAGE_PNG;
            case "gif" -> MediaType.IMAGE_GIF;
            default -> throw new UnsupportedFormatException("unknown image type: " + ext);
        };
        ZipArchiveEntry entry = entries.get(pageIndex);
        try (InputStream input = zipFile.getInputStream(entry)) {
            return new MangaPage(IOUtils.toByteArray(input), mediaType);
        }
    }

    @Override
    public void close() throws IOException {
        zipFile.close();
    }
}
