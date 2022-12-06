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

    @PostMapping("")
    public void addLibrary(@RequestBody Library library) {
        service.addLibrary(library);
    }

    @DeleteMapping("/{id}")
    public void deleteLibrary(@PathVariable int id) {
        service.deleteLibrary(id);
    }

    @PutMapping("/{id}")
    public void updateLibrary(@PathVariable int id, @RequestBody Library library) {
        service.updateLibrary(id, library);
    }

    @GetMapping("")
    private List<Library> getAllLibraries() {
        return service.getAllLibraries();
    }

    @GetMapping("/{id}")
    public Library getLibraryById(@PathVariable int id) {
        return service.getLibraryById(id);
    }

    @GetMapping("/{id}/scan-manga")
    public void scanManga(@PathVariable int id) {
        service.scanManga(id);
    }

    @GetMapping("/{id}/list-manga")
    public List<Manga> listManga(@PathVariable int id) {
        return service.listManga(id);
    }
}
