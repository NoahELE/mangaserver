package com.noahele.mangaserver.utils;

import com.noahele.mangaserver.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public class CurrUserFacade {
    private CurrUserFacade() {
    }

    public static User getUser() {
        try {
            return ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).user();
        } catch (Exception e) {
            log.warn("Get current user error", e);
            return null;
        }
    }
}
