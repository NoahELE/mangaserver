package com.noahele.mangaserver.utils.reader;

import com.google.common.collect.Streams;
import com.noahele.mangaserver.utils.MangaPageInfo;
import com.noahele.mangaserver.utils.NaturalOrder;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipFile;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.http.MediaType;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.List;

public class ZipMangaReader implements MangaReader {
    private final ZipFile zipFile;
    private final List<ZipArchiveEntry> entries;

    public ZipMangaReader(File file) throws IOException {
        this.zipFile = new ZipFile(file);
        Enumeration<ZipArchiveEntry> entries = zipFile.getEntries();
        this.entries = Streams.stream(entries::asIterator)
                // remove directory entry
                .filter((entry) -> !entry.isDirectory())
                // sort entries by name with natural order
                .sorted((e1, e2) -> NaturalOrder.compare(e1.getName(), e2.getName()))
                .toList();
    }

    @Override
    public int getNumOfPages() {
        return entries.size();
    }


    @Override
    public MangaPageInfo getPage(int pageIndex) throws IOException {
        ZipArchiveEntry entry = entries.get(pageIndex);
        MediaType mediaType = MangaReader.getPageMediaType(entry.getName());
        try (InputStream input = zipFile.getInputStream(entry)) {
            return new MangaPageInfo(IOUtils.toByteArray(input), mediaType);
        }
    }

    @Override
    public void close() throws IOException {
        zipFile.close();
    }
}
