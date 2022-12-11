package com.noahele.mangaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MangaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(MangaServerApplication.class, args);
    }
}
