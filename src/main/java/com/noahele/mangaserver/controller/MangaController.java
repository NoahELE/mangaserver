package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.exception.OwnerNotMatchException;
import com.noahele.mangaserver.service.MangaService;
import com.noahele.mangaserver.utils.MangaPage;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/manga")
public class MangaController {
    private final MangaService mangaService;

    public MangaController(MangaService mangaService) {
        this.mangaService = mangaService;
    }

    @PostMapping("")
    @Operation(summary = "add a manga")
    public void addManga(@RequestBody Manga manga, int libraryId)
            throws OwnerNotMatchException {
        log.info("Add manga {} to library {}", manga, libraryId);
        mangaService.addManga(manga, libraryId);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "delete a manga")
    public void deleteManga(@PathVariable int id) throws OwnerNotMatchException {
        log.info("Delete manga {}", id);
        mangaService.deleteManga(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "update a manga")
    public void updateManga(@PathVariable int id, @RequestBody Manga manga)
            throws OwnerNotMatchException {
        log.info("Update manga {}", manga);
        mangaService.updateManga(id, manga);
    }

    @GetMapping("")
    @Operation(summary = "get all manga from a library")
    public Page<Manga> getAllByLibrary(int libraryId, int page, int size) throws OwnerNotMatchException {
        log.info("Library {} get all manga in page {}", libraryId, page);
        return mangaService.getAllByLibrary(libraryId, page, size);
    }

    @GetMapping("/{id}")
    @Operation(summary = "get manga by id")
    public Manga getManga(@PathVariable int id) throws OwnerNotMatchException {
        log.info("Get manga {}", id);
        return mangaService.getManga(id);
    }

    @GetMapping("/{id}/page/{pageIndex}")
    @Operation(summary = "get a page from manga")
    public ResponseEntity<byte[]> getMangaPage(@PathVariable int id, @PathVariable int pageIndex)
            throws OwnerNotMatchException, IOException {
        log.info("Get page {} from manga {}", pageIndex, id);
        MangaPage mangaPage = mangaService.getMangaPage(id, pageIndex);
        return ResponseEntity.ok()
                .contentType(mangaPage.type())
                .body(mangaPage.page());
    }
}
