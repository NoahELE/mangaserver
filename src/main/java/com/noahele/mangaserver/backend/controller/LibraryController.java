package com.noahele.mangaserver.backend.controller;

import com.noahele.mangaserver.backend.entity.Library;
import com.noahele.mangaserver.backend.entity.Manga;
import com.noahele.mangaserver.backend.service.LibraryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/library")
public class LibraryController {
    private final LibraryService service;

    public LibraryController(LibraryService service) {
        this.service = service;
    }

    @PostMapping("")
    public void addLibrary(@RequestBody Library library) {
        log.info("Add library {}", library);
        service.addLibrary(library);
    }

    @DeleteMapping("/{id}")
    public void deleteLibrary(@PathVariable int id) {
        log.info("Delete library with id {}", id);
        service.deleteLibrary(id);
    }

    @PutMapping("/{id}")
    public void updateLibrary(@PathVariable int id, @RequestBody Library library) {
        log.info("Update library with id {} to {}", id, library);
        service.updateLibrary(id, library);
    }

    @GetMapping("")
    private List<Library> getAllLibraries() {
        log.info("Get all libraries");
        return service.getAllLibraries();
    }

    @GetMapping("/{id}")
    public Library getLibraryById(@PathVariable int id) {
        log.info("Get library by id {}", id);
        return service.getLibraryById(id);
    }

    @GetMapping("/{id}/scan-manga")
    public void scanManga(@PathVariable int id) {
        log.info("Scan manga in library with id {}", id);
        service.scanManga(id);
    }

    @GetMapping("/{id}/list-manga")
    public List<Manga> listManga(@PathVariable int id) {
        log.info("List manga in library with id {}", id);
        return service.listManga(id);
    }
}
