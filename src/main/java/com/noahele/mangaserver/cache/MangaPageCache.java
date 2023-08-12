package com.noahele.mangaserver.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.noahele.mangaserver.utils.MangaPageInfo;
import com.noahele.mangaserver.utils.reader.MangaReader;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.springframework.stereotype.Component;

import java.io.File;
import java.time.Duration;


@Component
public class MangaPageCache {
    private final static int CACHE_INITIAL_SIZE = 64;
    private final static int CACHE_MAX_SIZE = 256;
    private final static int CACHE_EXPIRE_MINUTES = 30;
    private final LoadingCache<Key, MangaPageInfo> cache = Caffeine.newBuilder()
            .initialCapacity(CACHE_INITIAL_SIZE)
            .maximumSize(CACHE_MAX_SIZE)
            .expireAfterWrite(Duration.ofMinutes(CACHE_EXPIRE_MINUTES))
            .build((key) -> {
                try (MangaReader reader = MangaReader.fromFile(key.file)) {
                    return reader.getPage(key.index);
                }
            });

    public @NonNull MangaPageInfo get(File file, int index) {
        return cache.get(new Key(file, index));
    }

    private record Key(File file, int index) {
    }
}