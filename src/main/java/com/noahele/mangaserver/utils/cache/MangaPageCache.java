package com.noahele.mangaserver.utils.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Policy;
import com.github.benmanes.caffeine.cache.stats.CacheStats;
import com.noahele.mangaserver.utils.MangaPage;
import com.noahele.mangaserver.utils.reader.MangaReader;
import org.checkerframework.checker.index.qual.NonNegative;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.checkerframework.checker.nullness.qual.Nullable;
import org.checkerframework.checker.nullness.qual.PolyNull;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentMap;
import java.util.function.Function;

@Component
public class MangaPageCache implements Cache<MangaPageCache.Key, MangaPage> {
    public record Key(String path, int index) {
    }

    private final static int CACHE_INITIAL_SIZE = 64;
    private final static int CACHE_MAX_SIZE = 128;
    private final static int CACHE_EXPIRE_MINUTES = 10;
    private final static int READ_AHEAD_SIZE = 8;
    private final Cache<Key, MangaPage> cache = Caffeine.newBuilder()
            .initialCapacity(CACHE_INITIAL_SIZE)
            .maximumSize(CACHE_MAX_SIZE)
            .expireAfterWrite(Duration.ofMinutes(CACHE_EXPIRE_MINUTES))
            .build();

    public @NonNull MangaPage get(String path, int index) throws IOException {
        Key key = new Key(path, index);
        MangaPage mangaPage = getIfPresent(key);
        if (mangaPage != null) {
            return mangaPage;
        } else {
            // read ahead pages after index and put them in cache
            try (MangaReader reader = MangaReader.getByPath(path)) {
                // read ahead `READ_AHEAD_SIZE` pages
                int numOfPages = reader.getNumOfPages();
                for (int i = index; i < Math.min(numOfPages, index + READ_AHEAD_SIZE); i++) {
                    put(new Key(path, index), reader.getPage(i));
                }
            }
            return Objects.requireNonNull(getIfPresent(key));
        }
    }

    @Override
    public @Nullable MangaPage getIfPresent(Key key) {
        return cache.getIfPresent(key);
    }

    @Override
    public @PolyNull MangaPage get(Key key,
                                   Function<? super Key,
                                           ? extends @PolyNull MangaPage>
                                           mappingFunction) {
        return cache.get(key, mappingFunction);
    }

    @Override
    public Map<Key, MangaPage> getAllPresent(Iterable<? extends Key> keys) {
        return cache.getAllPresent(keys);
    }

    @Override
    public Map<Key, MangaPage> getAll(Iterable<? extends Key> keys,
                                      Function<? super Set<? extends Key>,
                                              ? extends Map<? extends Key,
                                                      ? extends MangaPage>>
                                              mappingFunction) {
        return cache.getAll(keys, mappingFunction);
    }

    @Override
    public void put(Key key, MangaPage value) {
        cache.put(key, value);
    }

    @Override
    public void putAll(Map<? extends Key, ? extends MangaPage> map) {
        cache.putAll(map);
    }

    @Override
    public void invalidate(Key key) {
        cache.invalidate(key);
    }

    @Override
    public void invalidateAll(Iterable<? extends Key> keys) {
        cache.invalidateAll(keys);
    }

    @Override
    public void invalidateAll() {
        cache.invalidateAll();
    }

    @Override
    public @NonNegative long estimatedSize() {
        return cache.estimatedSize();
    }

    @Override
    public CacheStats stats() {
        return cache.stats();
    }

    @Override
    public ConcurrentMap<Key, MangaPage> asMap() {
        return cache.asMap();
    }

    @Override
    public void cleanUp() {
        cache.cleanUp();
    }

    @Override
    public Policy<Key, MangaPage> policy() {
        return cache.policy();
    }
}
