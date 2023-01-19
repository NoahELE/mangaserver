package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.exception.OwnerNotMatchException;
import com.noahele.mangaserver.service.MangaService;
import com.noahele.mangaserver.utils.MangaPage;
import lombok.extern.slf4j.Slf4j;
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
    public void addManga(@RequestBody Manga manga, int libraryId)
            throws OwnerNotMatchException {
        log.info("Add manga {} to library {}", manga, libraryId);
        mangaService.addManga(manga, libraryId);
    }

    @DeleteMapping("/{id}")
    public void deleteManga(@PathVariable int id) throws OwnerNotMatchException {
        log.info("Delete manga {}", id);
        mangaService.deleteManga(id);
    }

    @PutMapping("/{id}")
    public void updateManga(@PathVariable int id, @RequestBody Manga manga)
            throws OwnerNotMatchException {
        log.info("Update manga {}", manga);
        mangaService.updateManga(id, manga);
    }

    @GetMapping("/{id}")
    public Manga getManga(@PathVariable int id) throws OwnerNotMatchException {
        log.info("Get manga {}", id);
        return mangaService.getManga(id);
    }

    @GetMapping("/{id}/page/{pageIndex}")
    public ResponseEntity<byte[]> getMangaPage(@PathVariable int id, @PathVariable int pageIndex)
            throws OwnerNotMatchException, IOException {
        log.info("Get page {} from manga {}", pageIndex, id);
        MangaPage mangaPage = mangaService.getMangaPageInfo(id, pageIndex);
        return ResponseEntity.ok()
                .contentType(mangaPage.type())
                .body(mangaPage.page());
    }
}
