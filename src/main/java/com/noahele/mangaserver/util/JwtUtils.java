package com.noahele.mangaserver.util;

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
    private static final int EXPIRE_HOURS = 8;
    private static final KeyPair SECRET_KEYS = Keys.keyPairFor(SignatureAlgorithm.ES256);

    private JwtUtils() {
    }

    public static String createJws(MyUserDetails userDetails) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiration = now.plusHours(EXPIRE_HOURS);
        return Jwts.builder()
                .setSubject(String.valueOf(userDetails.getId()))
                .setIssuer("mangaserver")
                .setIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .setExpiration(Date.from(expiration.atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(SECRET_KEYS.getPrivate())
                .compact();
    }

    public static int parseJws(String jws) {
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEYS.getPublic())
                .build()
                .parseClaimsJws(jws);
        return Integer.parseInt(claims.getBody().getSubject());
    }
}
