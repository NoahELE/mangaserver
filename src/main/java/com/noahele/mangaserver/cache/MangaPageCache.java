package com.noahele.mangaserver.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.noahele.mangaserver.utils.MangaPageInfo;
import com.noahele.mangaserver.utils.reader.MangaReader;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.time.Duration;

@Component
public class MangaPageCache {
    private static final int CACHE_INITIAL_SIZE = 64;
    private static final int CACHE_MAX_SIZE = 256;
    private static final int CACHE_EXPIRE_MINUTES = 30;
    private final LoadingCache<Key, MangaPageInfo> cache =
            Caffeine.newBuilder()
                    .initialCapacity(CACHE_INITIAL_SIZE)
                    .maximumSize(CACHE_MAX_SIZE)
                    .expireAfterWrite(Duration.ofMinutes(CACHE_EXPIRE_MINUTES))
                    .build(
                            (key) -> {
                                try (MangaReader reader = MangaReader.fromPath(key.path)) {
                                    return reader.getPage(key.index);
                                }
                            });

    public MangaPageInfo get(Path path, int index) {
        return cache.get(new Key(path, index));
    }

    private record Key(Path path, int index) {
    }
}
