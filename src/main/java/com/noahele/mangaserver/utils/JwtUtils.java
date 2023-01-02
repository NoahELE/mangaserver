package com.noahele.mangaserver.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.KeyPair;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public final class JwtUtils {
    private static final KeyPair SECRET_KEYS = Keys.keyPairFor(SignatureAlgorithm.ES256);

    private JwtUtils() {
    }

    public static String createJwt(MyUserDetails userDetails) {
        LocalDateTime now = LocalDateTime.now();
        return Jwts.builder()
                .setSubject(String.valueOf(userDetails.user().getId()))
                .setIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(SECRET_KEYS.getPrivate())
                .compact();
    }

    public static int parseJwt(String jwt) {
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEYS.getPublic())
                .build()
                .parseClaimsJws(jwt);
        return Integer.parseInt(claims.getBody().getSubject());
    }
}
