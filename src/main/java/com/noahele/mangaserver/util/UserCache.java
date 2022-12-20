package com.noahele.mangaserver.util;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheStats;
import com.google.common.collect.ImmutableMap;
import lombok.NonNull;
import org.springframework.stereotype.Component;

import javax.annotation.CheckForNull;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ExecutionException;

@Component
public class UserCache implements Cache<Integer, MyUserDetails> {
    private final int USER_CACHE_SIZE = 32;
    private final Cache<Integer, MyUserDetails> cache = CacheBuilder.newBuilder()
            .initialCapacity(USER_CACHE_SIZE)
            .maximumSize(USER_CACHE_SIZE)
            .build();

    @CheckForNull
    @Override
    public MyUserDetails getIfPresent(@NonNull Object key) {
        return cache.getIfPresent(key);
    }

    @Override
    public @NonNull MyUserDetails get(@NonNull Integer key,
                                      @NonNull Callable<? extends MyUserDetails> loader)
            throws ExecutionException {
        return cache.get(key, loader);
    }

    @Override
    public @NonNull ImmutableMap<Integer, MyUserDetails> getAllPresent(@NonNull Iterable<?> keys) {
        return cache.getAllPresent(keys);
    }

    @Override
    public void put(@NonNull Integer key, @NonNull MyUserDetails value) {
        cache.put(key, value);
    }

    @Override
    public void putAll(@NonNull Map<? extends Integer, ? extends MyUserDetails> m) {
        cache.putAll(m);
    }

    @Override
    public void invalidate(@NonNull Object key) {
        cache.invalidate(key);
    }

    @Override
    public void invalidateAll(@NonNull Iterable<?> keys) {
        cache.invalidateAll(keys);
    }

    @Override
    public void invalidateAll() {
        cache.invalidateAll();
    }

    @Override
    public long size() {
        return cache.size();
    }

    @Override
    public @NonNull CacheStats stats() {
        return cache.stats();
    }

    @Override
    public @NonNull ConcurrentMap<Integer, MyUserDetails> asMap() {
        return cache.asMap();
    }

    @Override
    public void cleanUp() {
        cache.cleanUp();
    }
}
