package com.noahele.mangaserver.backend.controller;

import com.noahele.mangaserver.backend.entity.Manga;
import com.noahele.mangaserver.backend.service.MangaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/manga")
public class MangaController {
    private final MangaService service;

    public MangaController(MangaService service) {
        this.service = service;
    }

    @PostMapping("")
    public void addManga(@RequestBody Manga manga) {
        service.addManga(manga);
    }

    @DeleteMapping("/{id}")
    public void deleteMange(@PathVariable int id) {
        service.deleteManga(id);
    }

    @PutMapping("/{id}")
    public void updateManga(@PathVariable int id, @RequestBody Manga manga) {
        service.updateManga(id, manga);
    }

    @GetMapping("/{id}")
    public Manga getMangaById(@PathVariable int id) {
        return service.getMangaById(id);
    }

    @GetMapping("/{id}/page")
    public List<String> getAllMangaPageNames(@PathVariable int id) throws ExecutionException {
        Manga manga = service.getMangaById(id);
        return service.getAllMangaPageNames(manga);
    }

    @GetMapping("/{id}/page/{pageIndex}")
    public ResponseEntity<byte[]> getMangaPage(@PathVariable int id, @PathVariable int pageIndex) throws ExecutionException {
        Manga manga = service.getMangaById(id);
        return ResponseEntity.ok()
                .contentType(service.getMangaPageExt(manga, pageIndex))
                .body(service.getMangaPage(manga, pageIndex));
    }
}
