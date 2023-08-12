package com.noahele.mangaserver.domain.user;

import com.noahele.mangaserver.cache.UserCache;
import com.noahele.mangaserver.exception.NotAdminException;
import com.noahele.mangaserver.security.JwtUtils;
import com.noahele.mangaserver.security.SecurityUtils;
import com.noahele.mangaserver.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserCache userCache;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public void addUser(User user) {
        assert user.getId() == null;
        // encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // set the role ROLE_USER
        user.setRole(Role.ROLE_USER);
        userRepository.save(user);
    }

    public void addAdminUser(User user) {
        assert user.getId() == null;
        // check if the current user is an admin
        User currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null && !currentUser.getRole().equals(Role.ROLE_ADMIN)) {
            throw new NotAdminException();
        }
        // encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // set the role ROLE_ADMIN
        user.setRole(Role.ROLE_ADMIN);
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
