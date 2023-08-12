package com.noahele.mangaserver.domain.admin;

import com.noahele.mangaserver.domain.user.User;
import com.noahele.mangaserver.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@Slf4j
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;

    @PostMapping("/user")
    public void addAdminUser(@RequestBody User user) {
        log.info("Add admin user, user = {}", user);
        userService.addAdminUser(user);
    }
}
