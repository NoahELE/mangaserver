package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Author;
import com.noahele.mangaserver.service.AuthorService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/author")
public class AuthorController {
    private final AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping("")
    @Operation(summary = "get all authors from a library")
    public Page<Author> getAllAuthorsByLibrary(int libraryId, int page, int size) {
        log.info("Get authors from Library {}, page = {}, size = {}", libraryId, page, size);
        return authorService.getAllAuthorsByLibrary(libraryId, page, size);
    }
}
