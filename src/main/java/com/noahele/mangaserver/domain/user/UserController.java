package com.noahele.mangaserver.domain.user;

import com.noahele.mangaserver.security.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("")
    @Operation(summary = "Add a user")
    public void addUser(@RequestBody User user) {
        log.info("Add user, user = {}", user);
        userService.addUser(user);
    }

    @PostMapping("/login")
    @Operation(summary = "User login")
    public String login(@RequestBody User user) {
        log.info("User login, user = {}", user);
        return userService.login(user);
    }

    @GetMapping("/logout")
    @Operation(summary = "User logout")
    public void logout() {
        UserDetailsImpl userDetailsImpl = userService.logout();
        log.info("User logout, user = {}", userDetailsImpl);
    }
}
