package com.noahele.mangaserver;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.KeyPair;

@SpringBootTest
class MangaServerApplicationTests {
    @Test
    void generateJwtKeyPair() {
        KeyPair keyPair = Keys.keyPairFor(SignatureAlgorithm.ES256);
        System.out.println(keyPair.getPublic());
        System.out.println(keyPair.getPrivate());
    }
}
