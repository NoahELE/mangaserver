package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.service.UserService;
import com.noahele.mangaserver.utils.MyUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("")
    public void addUser(@RequestBody User user) {
        log.info("Add user: {}", user);
        userService.addUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        log.info("User login: {}", user);
        return userService.login(user);
    }

    @GetMapping("/logout")
    public void logout() {
        MyUserDetails myUserDetails = userService.logout();
        log.info("User logout: {}", myUserDetails);
    }
}
