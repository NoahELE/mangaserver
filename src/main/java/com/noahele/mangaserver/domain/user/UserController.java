package com.noahele.mangaserver.domain.user;

import com.noahele.mangaserver.security.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

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

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable int userId) {
        log.info("delete user, userId = {}", userId);
        userService.deleteUser(userId);
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/{userId}")
    public void updateUser(@PathVariable int userId, @RequestBody User user) {
        log.info("delete user, userId = {}", userId);
        userService.updateUser(userId, user);
    }
}
