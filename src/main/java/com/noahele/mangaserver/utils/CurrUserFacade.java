package com.noahele.mangaserver.utils;

import com.noahele.mangaserver.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;

public class CurrUserFacade {
    private CurrUserFacade() {
    }

    public static User getUser() {
        return ((MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).user();
    }
}
