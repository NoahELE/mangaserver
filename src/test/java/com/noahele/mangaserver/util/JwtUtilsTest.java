package com.noahele.mangaserver.util;

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
    private String jws;

    @Test
    void generateJws() {
        jws = JwtUtils.createJws(new MyUserDetails(user));
        System.out.println(user);
        System.out.println(jws);
    }

    @Test
    void parseJws() {
        generateJws();
        int id = JwtUtils.parseJws(jws);
        System.out.println(id);
        Assertions.assertEquals(id, user.getId());
    }
}
