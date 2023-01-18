package com.noahele.mangaserver.utils;

import org.springframework.http.MediaType;

public record MangaPage(byte[] page, MediaType type) {
}
