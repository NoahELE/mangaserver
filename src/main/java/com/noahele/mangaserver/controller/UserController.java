package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.service.UserService;
import com.noahele.mangaserver.util.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("")
    public Response<?> addUser(@RequestBody User user) {
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
            String jws = userService.login(user);
            return Response.ok(jws);
        } catch (Exception e) {
            log.error("User login error: ", e);
            return Response.err(e);
        }
    }
}
