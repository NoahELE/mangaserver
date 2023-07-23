package com.noahele.mangaserver.utils.reader;

import com.google.common.collect.Streams;
import com.noahele.mangaserver.utils.MangaPageInfo;
import com.noahele.mangaserver.utils.NaturalOrder;
import org.apache.commons.compress.archivers.sevenz.SevenZArchiveEntry;
import org.apache.commons.compress.archivers.sevenz.SevenZFile;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.http.MediaType;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class SevenZMangaReader extends MangaReader {
    private final SevenZFile sevenZFile;
    private final List<SevenZArchiveEntry> entries;

    public SevenZMangaReader(File file) throws IOException {
        this.sevenZFile = new SevenZFile(file);
        Iterable<SevenZArchiveEntry> entries = sevenZFile.getEntries();
        this.entries = Streams.stream(entries)
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
        SevenZArchiveEntry entry = entries.get(pageIndex);
        MediaType mediaType = getPageMediaType(entry.getName());
        try (InputStream input = sevenZFile.getInputStream(entry)) {
            return new MangaPageInfo(IOUtils.toByteArray(input), mediaType);
        }
    }

    @Override
    public void close() throws IOException {
        sevenZFile.close();
    }
}
