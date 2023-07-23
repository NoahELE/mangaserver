package com.noahele.mangaserver.domain.user;

import com.noahele.mangaserver.cache.UserCache;
import com.noahele.mangaserver.security.JwtUtils;
import com.noahele.mangaserver.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserCache userCache;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository,
                       UserCache userCache,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.userCache = userCache;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public void addUser(User user) {
        assert user.getId() != null;
        // encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }

    public void updateUser(int userId, User user) {
        assert user.getId() == null;
        user.setId(userId);
        userRepository.save(user);
    }

    public User getUser(int userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    public String login(User user) {
        // authenticate the user
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        Authentication auth = authenticationManager.authenticate(token);
        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) auth.getPrincipal();
        // save the user in cache
        userCache.put(userDetailsImpl.user().getId(), userDetailsImpl);
        // return the generated jwt
        return JwtUtils.createJwt(userDetailsImpl);
    }

    public UserDetailsImpl logout() {
        // get authentication from context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // cast to MyUserDetails
        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
        // invalidate from cache
        userCache.invalidate(userDetailsImpl.user().getId());
        return userDetailsImpl;
    }
}
