package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.service.MangaService;
import com.noahele.mangaserver.utils.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/manga")
public class MangaController {
    private final MangaService mangaService;

    public MangaController(MangaService mangaService) {
        this.mangaService = mangaService;
    }

    @PostMapping("")
    public Response<Void> addManga(@RequestBody Manga manga, int libraryId) {
        try {
            log.info("Add manga {} to library {}", manga, libraryId);
            mangaService.addManga(manga, libraryId);
            return Response.ok();
        } catch (Exception e) {
            log.error("Add manga error", e);
            return Response.err(e);
        }
    }

    @DeleteMapping("/{id}")
    public Response<Void> deleteManga(@PathVariable int id) {
        try {
            log.info("Delete manga {}", id);
            mangaService.deleteManga(id);
            return Response.ok();
        } catch (Exception e) {
            log.error("Delete manga error", e);
            return Response.err(e);
        }
    }

    @PutMapping("/{id}")
    public Response<Void> updateManga(@PathVariable int id, @RequestBody Manga manga) {
        try {
            log.info("Update manga {}", manga);
            mangaService.updateManga(id, manga);
            return Response.ok();
        } catch (Exception e) {
            log.error("Update manga error", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}")
    public Response<Manga> getManga(@PathVariable int id) {
        try {
            log.info("Get manga {}", id);
            Manga manga = mangaService.getManga(id);
            return Response.ok(manga);
        } catch (Exception e) {
            log.error("Get manga error", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/page")
    public Response<List<String>> getAllMangaPageNames(@PathVariable int id) {
        try {
            log.info("Get all pages from manga {}", id);
            List<String> mangaPageNames = mangaService.getAllMangaPageNames(id);
            return Response.ok(mangaPageNames);
        } catch (Exception e) {
            log.error("Get manga page names error", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/page/{pageIndex}")
    public ResponseEntity<byte[]> getMangaPage(@PathVariable int id, @PathVariable int pageIndex) {
        try {
            log.info("Get page {} from manga {}", pageIndex, id);
            return ResponseEntity.ok()
                    .contentType(mangaService.getMangaPageExt(id, pageIndex))
                    .body(mangaService.getMangaPage(id, pageIndex));
        } catch (Exception e) {
            log.error("Get manga page error", e);
            throw new RuntimeException(e);
        }
    }
}
