package com.noahele.mangaserver.config;

import com.noahele.mangaserver.filter.JwtAuthenticationFilter;
import com.noahele.mangaserver.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
    private final MyUserDetailsService myUserDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    public WebSecurityConfig(MyUserDetailsService myUserDetailsService,
                             JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.myUserDetailsService = myUserDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // disable csrf as the application uses jwt
        http.csrf(AbstractHttpConfigurer::disable);
        // disable session id
        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        // set UserDetailsService
        http.userDetailsService(myUserDetailsService);
        // authorize requests
        http.authorizeHttpRequests(requests -> {
            // allow all access to sign up and login
            requests.requestMatchers(HttpMethod.POST, "/api/user", "/api/user/login").permitAll();
            // all other api require authentication
            requests.requestMatchers("/api/**").authenticated();
            // allow all access to web ui
            requests.requestMatchers(HttpMethod.GET, "/**").permitAll();
        });
        // add JwtAuthenticationFilter
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
