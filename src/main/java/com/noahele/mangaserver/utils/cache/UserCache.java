package com.noahele.mangaserver.utils.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.noahele.mangaserver.utils.MyUserDetails;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class UserCache {
    private static final int INITIAL_USER_SIZE = 16;
    private static final int EXPIRE_DAYS = 1;
    private final Cache<Integer, MyUserDetails> cache = Caffeine.newBuilder()
            .initialCapacity(INITIAL_USER_SIZE)
            .expireAfterAccess(Duration.ofDays(EXPIRE_DAYS))
            .build();

    public MyUserDetails getIfPresent(int id) {
        return cache.getIfPresent(id);
    }

    public void put(int id, MyUserDetails user) {
        cache.put(id, user);
    }

    public void invalidate(int id) {
        cache.invalidate(id);
    }
}
