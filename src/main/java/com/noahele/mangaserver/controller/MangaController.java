package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.service.MangaService;
import com.noahele.mangaserver.utils.MangaPage;
import com.noahele.mangaserver.utils.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/manga")
public class MangaController {
    private final MangaService mangaService;

    public MangaController(MangaService mangaService) {
        this.mangaService = mangaService;
    }

    @PostMapping("")
    public R<Void> addManga(@RequestBody Manga manga, int libraryId) {
        try {
            log.info("Add manga {} to library {}", manga, libraryId);
            mangaService.addManga(manga, libraryId);
            return R.ok();
        } catch (Exception e) {
            log.error("Add manga error", e);
            return R.err(e);
        }
    }

    @DeleteMapping("/{id}")
    public R<Void> deleteManga(@PathVariable int id) {
        try {
            log.info("Delete manga {}", id);
            mangaService.deleteManga(id);
            return R.ok();
        } catch (Exception e) {
            log.error("Delete manga error", e);
            return R.err(e);
        }
    }

    @PutMapping("/{id}")
    public R<Void> updateManga(@PathVariable int id, @RequestBody Manga manga) {
        try {
            log.info("Update manga {}", manga);
            mangaService.updateManga(id, manga);
            return R.ok();
        } catch (Exception e) {
            log.error("Update manga error", e);
            return R.err(e);
        }
    }

    @GetMapping("/{id}")
    public R<Manga> getManga(@PathVariable int id) {
        try {
            log.info("Get manga {}", id);
            Manga manga = mangaService.getManga(id);
            return R.ok(manga);
        } catch (Exception e) {
            log.error("Get manga error", e);
            return R.err(e);
        }
    }

    @GetMapping("/{id}/page/{pageIndex}")
    public ResponseEntity<byte[]> getMangaPage(@PathVariable int id, @PathVariable int pageIndex) {
        try {
            log.info("Get page {} from manga {}", pageIndex, id);
            MangaPage mangaPage = mangaService.getMangaPageInfo(id, pageIndex);
            return ResponseEntity.ok()
                    .contentType(mangaPage.type())
                    .body(mangaPage.page());
        } catch (Exception e) {
            log.error("Get manga page error", e);
            throw new RuntimeException(e);
        }
    }
}
