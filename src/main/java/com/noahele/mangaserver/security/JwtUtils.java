package com.noahele.mangaserver.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

import java.security.KeyPair;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public final class JwtUtils {
    private static final KeyPair SECRET_KEYS = Jwts.SIG.ES256.keyPair().build();
    private static final int EXPIRE_DAYS = 1;

    private JwtUtils() {
    }

    public static String createJwt(UserDetailsImpl userDetailsImpl) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiration = now.plusDays(EXPIRE_DAYS);
        return Jwts.builder()
                .issuer("mangaserver")
                .subject(String.valueOf(userDetailsImpl.user().getId()))
                .issuedAt(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()))
                .expiration(Date.from(expiration.atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(SECRET_KEYS.getPrivate())
                .compact();
    }

    public static int parseJwt(String jwt) {
        Jws<Claims> claims = Jwts.parser().verifyWith(SECRET_KEYS.getPublic()).build()
                .parseSignedClaims(jwt);
        return Integer.parseInt(claims.getPayload().getSubject());
    }
}
