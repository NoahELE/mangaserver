package com.noahele.mangaserver.filter;

import com.noahele.mangaserver.cache.UserCache;
import com.noahele.mangaserver.security.JwtUtils;
import com.noahele.mangaserver.security.UserDetailsImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserCache userCache;

    @Autowired
    public JwtAuthenticationFilter(UserCache userCache) {
        this.userCache = userCache;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // get Authorization header, return if there is no Authorization Bearer header
        String header = request.getHeader("Authorization");
        if (header == null) {
            log.warn("No Authorization header, url = {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        } else if (!header.startsWith("Bearer ")) {
            log.warn("Authorization header does not start with Bearer, url = {}", request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }
        // parse jwt
        String jwt = header.split(" ")[1].trim();
        int userId;
        try {
            userId = JwtUtils.parseJwt(jwt);
        } catch (Exception e) {
            log.error("JWT parse error: ", e);
            filterChain.doFilter(request, response);
            return;
        }
        // retrieve user from UserCache
        UserDetailsImpl userDetailsImpl = userCache.getIfPresent(userId);
        if (userDetailsImpl == null) {
            log.warn("No user with id {} in UserCache", userId);
            filterChain.doFilter(request, response);
            return;
        }
        // set Authentication to SecurityContext
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(userDetailsImpl, null, null);
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        filterChain.doFilter(request, response);
    }
}
