package com.noahele.mangaserver;

import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.KeyPair;

@SpringBootTest
class MangaServerApplicationTests {
    @Test
    void generateJwtKeyPair() {
        KeyPair keyPair = Jwts.SIG.ES256.keyPair().build();
        System.out.println(keyPair.getPublic());
        System.out.println(keyPair.getPrivate());
    }
}
