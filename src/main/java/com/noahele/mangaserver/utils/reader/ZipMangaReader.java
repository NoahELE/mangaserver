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
    private final List<String> filenames;

    public ZipMangaReader(String path) throws IOException {
        this.zipFile = new ZipFile(path);
        Enumeration<ZipArchiveEntry> entries = zipFile.getEntries();
        this.filenames = Streams.stream(entries::asIterator)
                // remove directory entry
                .filter(entry -> !entry.isDirectory())
                // map to filenames
                .map(ZipArchiveEntry::getName)
                // sort filenames with natural order
                .sorted(NaturalOrder::compare)
                .toList();
    }

    @Override
    public int getNumOfPages() {
        return filenames.size();
    }


    @Override
    public MangaPage getPage(int pageIndex) throws IOException {
        String ext = Files.getFileExtension(filenames.get(pageIndex)).toLowerCase();
        MediaType mediaType = switch (ext) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "png" -> MediaType.IMAGE_PNG;
            case "gif" -> MediaType.IMAGE_GIF;
            default -> throw new UnsupportedFormatException("unknown image type: " + ext);
        };
        String filename = filenames.get(pageIndex);
        ZipArchiveEntry entry = zipFile.getEntry(filename);
        try (InputStream input = zipFile.getInputStream(entry)) {
            return new MangaPage(IOUtils.toByteArray(input), mediaType);
        }
    }

    @Override
    public void close() throws IOException {
        zipFile.close();
    }
}
