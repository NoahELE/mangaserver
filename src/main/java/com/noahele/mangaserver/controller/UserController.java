package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.service.UserService;
import com.noahele.mangaserver.utils.MyUserDetails;
import com.noahele.mangaserver.utils.Response;
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
    public Response<Void> addUser(@RequestBody User user) {
        try {
            log.info("Add user: {}", user);
            userService.addUser(user);
            return Response.ok();
        } catch (Exception e) {
            log.error("Add user error: ", e);
            return Response.err(e);
        }
    }

    @PostMapping("/login")
    public Response<String> login(@RequestBody User user) {
        try {
            log.info("User login: {}", user);
            String jwt = userService.login(user);
            return Response.ok(jwt);
        } catch (Exception e) {
            log.error("User login error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/logout")
    public Response<Void> logout() {
        try {
            MyUserDetails myUserDetails = userService.logout();
            log.info("User logout: {}", myUserDetails);
            return Response.ok();
        } catch (Exception e) {
            log.error("User logout error: ", e);
            return Response.err(e);
        }
    }
}
