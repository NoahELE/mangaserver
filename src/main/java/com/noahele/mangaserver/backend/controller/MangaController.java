package com.noahele.mangaserver.backend.controller;

import com.noahele.mangaserver.backend.entity.Manga;
import com.noahele.mangaserver.backend.service.MangaService;
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

    @GetMapping("/{id}")
    public Manga getMangaById(@PathVariable Integer id) {
        return service.getMangaById(id);
    }

    @PostMapping("")
    public void addManga(@RequestBody Manga manga) {
        service.addManga(manga);
    }

    @DeleteMapping("/{id}")
    public void deleteMange(@PathVariable Integer id) {
        service.deleteManga(id);
    }

    @GetMapping("/read/{id}")
    public List<String> getMangaPageNames(@PathVariable Integer id) throws ExecutionException {
        return service.getAllMangaImagesNames(id);
    }

    @GetMapping("/read/{id}/{pageIndex}")
    public byte[] getMangaPage(@PathVariable Integer id, @PathVariable Integer pageIndex) throws ExecutionException {
        return service.getMangaPage(id, pageIndex);
    }
}
