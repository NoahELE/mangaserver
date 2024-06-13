package com.noahele.mangaserver.config;

import com.noahele.mangaserver.domain.user.User;
import com.noahele.mangaserver.security.SecurityUtils;
import java.util.Optional;
import lombok.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

@Configuration
public class CurrUserAuditorAware implements AuditorAware<User> {
  @Override
  public @NonNull Optional<User> getCurrentAuditor() {
    return Optional.ofNullable(SecurityUtils.getCurrentUser());
  }
}
