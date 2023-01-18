package com.noahele.mangaserver.utils.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.github.benmanes.caffeine.cache.Policy;
import com.github.benmanes.caffeine.cache.stats.CacheStats;
import com.noahele.mangaserver.utils.MangaPage;
import com.noahele.mangaserver.utils.reader.MangaReader;
import org.checkerframework.checker.index.qual.NonNegative;
import org.checkerframework.checker.nullness.qual.Nullable;
import org.checkerframework.checker.nullness.qual.PolyNull;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentMap;
import java.util.function.Function;

@Component
public class MangaPageCache implements LoadingCache<MangaPageCache.Key, MangaPage> {
    public record Key(String path, int index) {
    }

    private final static int CACHE_INITIAL_SIZE = 64;
    private final static int CACHE_MAX_SIZE = 128;
    private final LoadingCache<Key, MangaPage> cache = Caffeine.newBuilder()
            .initialCapacity(CACHE_INITIAL_SIZE)
            .maximumSize(CACHE_MAX_SIZE)
            .build(key -> {
                try (MangaReader reader = MangaReader.getByPath(key.path)) {
                    return reader.getPage(key.index);
                }
            });

    public MangaPage get(String path, int index) {
        return get(new Key(path, index));
    }

    @Override
    public MangaPage get(Key key) {
        return cache.get(key);
    }

    @Override
    public Map<Key, MangaPage> getAll(Iterable<? extends Key> keys) {
        return cache.getAll(keys);
    }

    @Override
    public CompletableFuture<MangaPage> refresh(Key key) {
        return cache.refresh(key);
    }

    @Override
    public CompletableFuture<Map<Key, MangaPage>> refreshAll(Iterable<? extends Key> keys) {
        return cache.refreshAll(keys);
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
