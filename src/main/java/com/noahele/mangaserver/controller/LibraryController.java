package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.service.LibraryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/library")
public class LibraryController {
    private final LibraryService libraryService;

    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @PostMapping("")
    @Operation(summary = "add a library")
    public void addLibrary(@RequestBody Library library) {
        log.info("Add library {}", library);
        libraryService.addLibrary(library);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "delete a library")
    public void deleteLibrary(@PathVariable int id) {
        log.info("Delete library {}", id);
        libraryService.deleteLibrary(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "update a library")
    public void updateLibrary(@PathVariable int id, @RequestBody Library library) {
        log.info("Update library {}, {}", id, library);
        libraryService.updateLibrary(id, library);
    }

    @GetMapping("")
    @Operation(summary = "get all libraries of current user")
    public Page<Library> getAllLibraries(int page, int size) {
        log.info("Get all libraries in page {}", page);
        return libraryService.getAllLibraries(page, size);
    }

    @GetMapping("/{id}")
    @Operation(summary = "get library by id")
    public Library getLibrary(@PathVariable int id) {
        log.info("Get library {}", id);
        return libraryService.getLibrary(id);
    }

    @GetMapping("/{id}/scanManga")
    @Operation(summary = "scan manga in library")
    public void scanManga(@PathVariable int id) {
        log.info("Scan manga in library {}", id);
        libraryService.scanManga(id);
    }
}
