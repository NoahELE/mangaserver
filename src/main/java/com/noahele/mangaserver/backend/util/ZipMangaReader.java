package com.noahele.mangaserver.backend.util;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import lombok.NonNull;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipFile;
import org.apache.commons.compress.utils.IOUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Enumeration;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class ZipMangaReader implements MangaReader {
    private final ZipFile zipFile;
    private final List<String> fileNames;
    private static final int PAGE_CACHE_SIZE = 16;
    private final LoadingCache<String, byte[]> pageCache = CacheBuilder.newBuilder()
            .initialCapacity(PAGE_CACHE_SIZE)
            .maximumSize(PAGE_CACHE_SIZE)
            .build(new CacheLoader<>() {
                @Override
                public byte @NonNull [] load(@NonNull String fileName) throws Exception {
                    return IOUtils.toByteArray(zipFile.getInputStream(zipFile.getEntry(fileName)));
                }
            });

    public ZipMangaReader(String file) throws IOException {
        this.zipFile = new ZipFile(file);
        Enumeration<ZipArchiveEntry> entries = zipFile.getEntries();
        List<ZipArchiveEntry> entryList = new ArrayList<>();
        while (entries.hasMoreElements()) {
            ZipArchiveEntry entry = entries.nextElement();
            // add the non dir entry to list
            if (!entry.isDirectory()) {
                entryList.add(entry);
            }
        }
        // list of names is sorted
        entryList.sort(Comparator.comparing(ZipArchiveEntry::getName));
        this.fileNames = entryList.stream().map(ZipArchiveEntry::getName).toList();
    }

    @Override
    public List<String> getAllFileNames() {
        return fileNames;
    }

    @Override
    public byte[] getPage(int pageIndex) throws ExecutionException {
        return pageCache.get(fileNames.get(pageIndex));
    }

    @Override
    public void close() throws IOException {
        zipFile.close();
    }
}
