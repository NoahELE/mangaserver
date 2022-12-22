package com.noahele.mangaserver.filter;

import com.noahele.mangaserver.util.JwtUtils;
import com.noahele.mangaserver.util.MyUserDetails;
import com.noahele.mangaserver.util.UserCache;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserCache userCache;

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
        if (header == null || !header.startsWith("Bearer")) {
            log.warn("No Authorization Bearer header");
            filterChain.doFilter(request, response);
            return;
        }
        // parse jws
        String jws = header.split(" ")[1].trim();
        int userId;
        try {
            userId = JwtUtils.parseJws(jws);
        } catch (Exception e) {
            log.error("JWT parse error: ", e);
            filterChain.doFilter(request, response);
            return;
        }
        // retrieve user from UserCache
        MyUserDetails myUserDetails = userCache.getIfPresent(userId);
        if (myUserDetails == null) {
            log.warn("No user with id {} in UserCache", userId);
            filterChain.doFilter(request, response);
            return;
        }
        // set Authentication to SecurityContext
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(myUserDetails, null, null);
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        filterChain.doFilter(request, response);
    }
}
