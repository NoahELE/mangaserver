package com.noahele.mangaserver.util.reader;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipFile;
import org.apache.commons.compress.utils.IOUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class ZipMangaReader implements MangaReader {
    private static final int PAGE_CACHE_SIZE = 16;
    private final ZipFile zipFile;
    private final List<String> filenames;
    private final LoadingCache<String, byte[]> pageCache;

    public ZipMangaReader(String file) throws IOException {
        this.zipFile = new ZipFile(file);
        Enumeration<ZipArchiveEntry> entries = zipFile.getEntries();
        List<ZipArchiveEntry> entryList = new ArrayList<>();
        while (entries.hasMoreElements()) {
            ZipArchiveEntry entry = entries.nextElement();
            // add entry to list if it is not a directory
            if (!entry.isDirectory()) {
                entryList.add(entry);
            }
        }
        this.filenames = entryList.stream()
                // map to list of String
                .map(ZipArchiveEntry::getName)
                // sort filenames
                .sorted()
                .toList();
        // init page cache
        this.pageCache = Caffeine.newBuilder()
                .initialCapacity(PAGE_CACHE_SIZE)
                .maximumSize(PAGE_CACHE_SIZE)
                .build(filename ->
                        IOUtils.toByteArray(zipFile.getInputStream(zipFile.getEntry(filename))));
    }

    @Override
    public List<String> getAllFileNames() {
        return filenames;
    }

    @Override
    public byte[] getPage(int pageIndex) {
        return pageCache.get(filenames.get(pageIndex));
    }

    @Override
    public void close() throws IOException {
        zipFile.close();
    }
}
