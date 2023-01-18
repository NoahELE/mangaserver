package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.service.UserService;
import com.noahele.mangaserver.utils.MyUserDetails;
import com.noahele.mangaserver.utils.R;
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
    public R<Void> addUser(@RequestBody User user) {
        try {
            log.info("Add user: {}", user);
            userService.addUser(user);
            return R.ok();
        } catch (Exception e) {
            log.error("Add user error: ", e);
            return R.err(e);
        }
    }

    @PostMapping("/login")
    public R<String> login(@RequestBody User user) {
        try {
            log.info("User login: {}", user);
            String jwt = userService.login(user);
            return R.ok(jwt);
        } catch (Exception e) {
            log.error("User login error: ", e);
            return R.err(e);
        }
    }

    @GetMapping("/logout")
    public R<Void> logout() {
        try {
            MyUserDetails myUserDetails = userService.logout();
            log.info("User logout: {}", myUserDetails);
            return R.ok();
        } catch (Exception e) {
            log.error("User logout error: ", e);
            return R.err(e);
        }
    }
}
