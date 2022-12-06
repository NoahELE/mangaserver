package com.noahele.mangaserver.backend.controller;

import com.noahele.mangaserver.backend.entity.Library;
import com.noahele.mangaserver.backend.entity.Manga;
import com.noahele.mangaserver.backend.service.LibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library")
public class LibraryController {
    private final LibraryService service;

    public LibraryController(LibraryService service) {
        this.service = service;
    }

    @GetMapping("")
    private List<Library> getAllLibraries() {
        return service.getAllLibraries();
    }

    @GetMapping("/{id}")
    public Library getLibraryById(@PathVariable Integer id) {
        return service.getLibraryById(id);
    }

    @GetMapping("/{id}/scan-manga")
    public void scanManga(@PathVariable Integer id) {
        service.scanManga(id);
    }

    @GetMapping("/{id}/list-manga")
    public List<Manga> listManga(@PathVariable Integer id) {
        return service.listManga(id);
    }

    @PostMapping("")
    public void addLibrary(@RequestBody Library library) {
        service.addLibrary(library);
    }

    @DeleteMapping("/{id}")
    public void deleteLibrary(@PathVariable Integer id) {
        service.deleteLibrary(id);
    }

    @PutMapping("/{id}")
    public void updateLibrary(@PathVariable Integer id, @RequestBody Library library) {
        service.updateLibrary(id, library);
    }
}
