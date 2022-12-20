package com.noahele.mangaserver.service;

import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.repository.UserRepository;
import com.noahele.mangaserver.util.JwtUtils;
import com.noahele.mangaserver.util.MyUserDetails;
import com.noahele.mangaserver.util.UserCache;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserCache userCache;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       UserCache userCache) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userCache = userCache;
    }

    public void addUser(User user) {
        assert user.getId() != null;
        // encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public void updateUser(int id, User user) {
        assert user.getId() == null;
        user.setId(id);
        userRepository.save(user);
    }

    public User getUser(int id) {
        return userRepository.findById(id).orElseThrow();
    }

    public String login(User user) {
        // authenticate the user
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        Authentication auth = authenticationManager.authenticate(token);
        MyUserDetails userDetails = (MyUserDetails) auth.getPrincipal();
        // save the user in cache
        userCache.put(userDetails.getId(), userDetails);
        // return the generated jws
        return JwtUtils.createJws(userDetails);
    }

    public MyUserDetails logout() {
        // get authentication from context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // cast to MyUserDetails
        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        // invalidate from cache
        userCache.invalidate(myUserDetails.getId());
        return myUserDetails;
    }
}
