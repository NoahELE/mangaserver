package com.noahele.mangaserver.utils;

import com.noahele.mangaserver.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class JwtUtilsTest {
    private final User user = new User() {
        {
            setId(3);
            setUsername("aaa");
            setPassword("bbb");
        }
    };
    private String jwt;

    @Test
    void generateJwt() {
        jwt = JwtUtils.createJwt(new UserDetailsImpl(user));
        System.out.println(user);
        System.out.println(jwt);
    }

    @Test
    void parseJwt() {
        generateJwt();
        int id = JwtUtils.parseJwt(jwt);
        System.out.println(id);
        Assertions.assertEquals(id, user.getId());
    }
}
