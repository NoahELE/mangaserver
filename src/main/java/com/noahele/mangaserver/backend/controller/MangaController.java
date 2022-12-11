package com.noahele.mangaserver.backend.controller;

import com.noahele.mangaserver.backend.entity.Manga;
import com.noahele.mangaserver.backend.service.MangaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Slf4j
@RestController
@RequestMapping("/api/manga")
public class MangaController {
    private final MangaService service;

    public MangaController(MangaService service) {
        this.service = service;
    }

    @PostMapping("")
    public void addManga(@RequestBody Manga manga) {
        log.info("Add mange {}", manga);
        service.addManga(manga);
    }

    @DeleteMapping("/{id}")
    public void deleteMange(@PathVariable int id) {
        log.info("Delete manga with id {}", id);
        service.deleteManga(id);
    }

    @PutMapping("/{id}")
    public void updateManga(@PathVariable int id, @RequestBody Manga manga) {
        log.info("Update manga with id {} to {}", id, manga);
        service.updateManga(id, manga);
    }

    @GetMapping("/{id}")
    public Manga getMangaById(@PathVariable int id) {
        log.info("Get manga by id {}", id);
        return service.getMangaById(id);
    }

    @GetMapping("/{id}/page")
    public List<String> getAllMangaPageNames(@PathVariable int id) throws ExecutionException {
        log.info("Get all pages from manga with id {}", id);
        Manga manga = service.getMangaById(id);
        return service.getAllMangaPageNames(manga);
    }

    @GetMapping("/{id}/page/{pageIndex}")
    public ResponseEntity<byte[]> getMangaPage(@PathVariable int id, @PathVariable int pageIndex) throws ExecutionException {
        log.info("Get page {} from manga with id {}", pageIndex, id);
        Manga manga = service.getMangaById(id);
        return ResponseEntity.ok()
                .contentType(service.getMangaPageExt(manga, pageIndex))
                .body(service.getMangaPage(manga, pageIndex));
    }
}
