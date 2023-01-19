package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.exception.OwnerNotMatchException;
import com.noahele.mangaserver.service.LibraryService;
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
    public void addLibrary(@RequestBody Library library) {
        log.info("Add library {}", library);
        libraryService.addLibrary(library);
    }

    @DeleteMapping("/{id}")
    public void deleteLibrary(@PathVariable int id)
            throws OwnerNotMatchException {
        log.info("Delete library {}", id);
        libraryService.deleteLibrary(id);
    }

    @PutMapping("/{id}")
    public void updateLibrary(@PathVariable int id, @RequestBody Library library)
            throws OwnerNotMatchException {
        log.info("Update library {}, {}", id, library);
        libraryService.updateLibrary(id, library);
    }

    @GetMapping("")
    public List<Library> getAllLibraries() {
        log.info("Get all libraries");
        return libraryService.getAllLibraries();
    }

    @GetMapping("/{id}")
    public Library getLibrary(@PathVariable int id)
            throws OwnerNotMatchException {
        log.info("Get library {}", id);
        return libraryService.getLibrary(id);
    }

    @GetMapping("/{id}/scanManga")
    public void scanManga(@PathVariable int id)
            throws OwnerNotMatchException, IOException {
        log.info("Scan manga in library {}", id);
        libraryService.scanManga(id);
    }

    @GetMapping("/{id}/listManga")
    public List<Manga> listManga(@PathVariable int id)
            throws OwnerNotMatchException {
        log.info("List manga in library {}", id);
        return libraryService.listManga(id);
    }
}
