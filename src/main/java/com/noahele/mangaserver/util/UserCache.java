package com.noahele.mangaserver.util;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Policy;
import com.github.benmanes.caffeine.cache.stats.CacheStats;
import org.checkerframework.checker.index.qual.NonNegative;
import org.checkerframework.checker.nullness.qual.Nullable;
import org.checkerframework.checker.nullness.qual.PolyNull;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentMap;
import java.util.function.Function;

@Component
public class UserCache implements Cache<Integer, MyUserDetails> {
    private static final int INITIAL_USER_SIZE = 32;
    private static final int EXPIRE_DAYS = 1;
    private final Cache<Integer, MyUserDetails> cache = Caffeine.newBuilder()
            .initialCapacity(INITIAL_USER_SIZE)
            .expireAfterAccess(Duration.ofDays(EXPIRE_DAYS))
            .build();

    @Override
    public @Nullable MyUserDetails getIfPresent(Integer key) {
        return cache.getIfPresent(key);
    }

    @Override
    public @PolyNull MyUserDetails get(Integer key,
                                       Function<? super Integer,
                                               ? extends @PolyNull MyUserDetails>
                                               mappingFunction) {
        return cache.get(key, mappingFunction);
    }

    @Override
    public Map<Integer, MyUserDetails> getAllPresent(Iterable<? extends Integer> keys) {
        return cache.getAllPresent(keys);
    }

    @Override
    public Map<Integer, MyUserDetails> getAll(Iterable<? extends Integer> keys,
                                              Function<? super Set<? extends Integer>,
                                                      ? extends Map<? extends Integer,
                                                              ? extends MyUserDetails>>
                                                      mappingFunction) {
        return cache.getAll(keys, mappingFunction);
    }

    @Override
    public void put(Integer key, MyUserDetails value) {
        cache.put(key, value);
    }

    @Override
    public void putAll(Map<? extends Integer, ? extends MyUserDetails> map) {
        cache.putAll(map);
    }

    @Override
    public void invalidate(Integer key) {
        cache.invalidate(key);
    }

    @Override
    public void invalidateAll(Iterable<? extends Integer> keys) {
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
    public ConcurrentMap<Integer, MyUserDetails> asMap() {
        return cache.asMap();
    }

    @Override
    public void cleanUp() {
        cache.cleanUp();
    }

    @Override
    public Policy<Integer, MyUserDetails> policy() {
        return cache.policy();
    }
}
