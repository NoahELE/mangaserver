package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.exception.OwnerNotMatchException;
import com.noahele.mangaserver.service.LibraryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/library")
public class LibraryController {
    private final LibraryService libraryService;

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
    public void deleteLibrary(@PathVariable int id)
            throws OwnerNotMatchException {
        log.info("Delete library {}", id);
        libraryService.deleteLibrary(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "update a library")
    public void updateLibrary(@PathVariable int id, @RequestBody Library library)
            throws OwnerNotMatchException {
        log.info("Update library {}, {}", id, library);
        libraryService.updateLibrary(id, library);
    }

    @GetMapping("")
    @Operation(summary = "get all libraries of current user")
    public List<Library> getAllLibraries() {
        log.info("Get all libraries");
        return libraryService.getAllLibraries();
    }

    @GetMapping("/{id}")
    @Operation(summary = "get library by id")
    public Library getLibrary(@PathVariable int id)
            throws OwnerNotMatchException {
        log.info("Get library {}", id);
        return libraryService.getLibrary(id);
    }

    @GetMapping("/{id}/scanManga")
    @Operation(summary = "scan manga in library")
    public void scanManga(@PathVariable int id)
            throws OwnerNotMatchException, IOException {
        log.info("Scan manga in library {}", id);
        libraryService.scanManga(id);
    }

    @GetMapping("/{id}/listManga")
    @Operation(summary = "list manga in library")
    public List<Manga> listManga(@PathVariable int id)
            throws OwnerNotMatchException {
        log.info("List manga in library {}", id);
        return libraryService.listManga(id);
    }
}
