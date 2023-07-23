package com.noahele.mangaserver.config;

import com.noahele.mangaserver.domain.user.User;
import com.noahele.mangaserver.security.SecurityUtils;
import lombok.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

@Configuration
public class CurrUserAuditorAware implements AuditorAware<User> {
    @Override
    public @NonNull Optional<User> getCurrentAuditor() {
        return Optional.ofNullable(SecurityUtils.getCurrentUser());
    }
}
