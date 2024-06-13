package com.noahele.mangaserver.security;

import com.noahele.mangaserver.domain.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public class SecurityUtils {
  private SecurityUtils() {}

  public static User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null) {
      return null;
    } else {
      return ((UserDetailsImpl) authentication.getPrincipal()).user();
    }
  }
}
