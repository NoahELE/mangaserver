package com.noahele.mangaserver.utils;

import org.springframework.http.MediaType;

public record MangaPageInfo(byte[] page, MediaType type) {}
