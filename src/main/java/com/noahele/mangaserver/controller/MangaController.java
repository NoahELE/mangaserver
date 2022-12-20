package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.service.MangaService;
import com.noahele.mangaserver.util.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Slf4j
@RestController
@RequestMapping("/api/manga")
public class MangaController {
    private final MangaService mangaService;

    public MangaController(MangaService mangaService) {
        this.mangaService = mangaService;
    }

    @PostMapping("")
    public Response<?> addManga(@RequestBody Manga manga) {
        try {
            log.info("Add manga: {}", manga);
            mangaService.addManga(manga);
            return Response.ok();
        } catch (Exception e) {
            log.error("Add manga error: ", e);
            return Response.err(e);
        }
    }

    @DeleteMapping("/{id}")
    public Response<?> deleteManga(@PathVariable int id) {
        try {
            log.info("Delete manga: {}", id);
            mangaService.deleteManga(id);
            return Response.ok();
        } catch (Exception e) {
            log.error("Delete manga error: ", e);
            return Response.err(e);
        }
    }

    @PutMapping("/{id}")
    public Response<?> updateManga(@PathVariable int id, @RequestBody Manga manga) {
        try {
            log.info("Update manga: {}", manga);
            mangaService.updateManga(id, manga);
            return Response.ok();
        } catch (Exception e) {
            log.error("Update manga error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}")
    public Response<Manga> getManga(@PathVariable int id) {
        try {
            log.info("Get manga: {}", id);
            Manga manga = mangaService.getManga(id);
            return Response.ok(manga);
        } catch (Exception e) {
            log.error("Get manga error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/page")
    public Response<List<String>> getAllMangaPageNames(@PathVariable int id) {
        try {
            log.info("Get all pages from manga with id {}", id);
            Manga manga = mangaService.getManga(id);
            List<String> mangaPageNames = mangaService.getAllMangaPageNames(manga);
            return Response.ok(mangaPageNames);
        } catch (Exception e) {
            log.error("Get manga page names error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/page/{pageIndex}")
    public ResponseEntity<byte[]> getMangaPage(@PathVariable int id, @PathVariable int pageIndex) throws ExecutionException {
        log.info("Get page {} from manga with id {}", pageIndex, id);
        Manga manga = mangaService.getManga(id);
        return ResponseEntity.ok()
                .contentType(mangaService.getMangaPageExt(manga, pageIndex))
                .body(mangaService.getMangaPage(manga, pageIndex));
    }
}
