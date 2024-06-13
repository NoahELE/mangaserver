package com.noahele.mangaserver;

import io.jsonwebtoken.Jwts;
import java.security.KeyPair;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MangaServerApplicationTests {
  @Test
  void generateJwtKeyPair() {
    KeyPair keyPair = Jwts.SIG.ES256.keyPair().build();
    System.out.println(keyPair.getPublic());
    System.out.println(keyPair.getPrivate());
  }
}
