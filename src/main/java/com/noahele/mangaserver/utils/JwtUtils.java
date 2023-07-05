package com.noahele.mangaserver.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.checkerframework.checker.nullness.qual.NonNull;

import java.security.KeyPair;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public final class JwtUtils {
    private static final KeyPair SECRET_KEYS = Keys.keyPairFor(SignatureAlgorithm.ES256);
    private static final int EXPIRE_DAYS = 1;

    private JwtUtils() {
    }

    public static String createJwt(@NonNull UserDetailsImpl userDetailsImpl) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiration = now.plusDays(EXPIRE_DAYS);
        return Jwts.builder()
                .setIssuer("mangaserver")
                .setSubject(String.valueOf(userDetailsImpl.user().getId()))
                .setIssuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .setExpiration(Date.from(expiration.atZone(ZoneId.systemDefault()).toInstant()))
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
