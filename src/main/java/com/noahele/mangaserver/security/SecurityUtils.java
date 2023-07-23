package com.noahele.mangaserver.security;

import com.noahele.mangaserver.domain.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public class SecurityUtils {
    private SecurityUtils() {
    }

    public static User getCurrentUser() {
        try {
            return ((UserDetailsImpl) SecurityContextHolder.getContext()
                    .getAuthentication().getPrincipal()).user();
        } catch (Exception e) {
            log.warn("Get current user error", e);
            return null;
        }
    }
}
