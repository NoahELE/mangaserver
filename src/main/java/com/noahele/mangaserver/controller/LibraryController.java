package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.service.LibraryService;
import com.noahele.mangaserver.utils.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
    public R<Void> addLibrary(@RequestBody Library library) {
        try {
            log.info("Add library {}", library);
            libraryService.addLibrary(library);
            return R.ok();
        } catch (Exception e) {
            log.error("Add library error", e);
            return R.err(e);
        }
    }

    @DeleteMapping("/{id}")
    public R<Void> deleteLibrary(@PathVariable int id) {
        try {
            log.info("Delete library {}", id);
            libraryService.deleteLibrary(id);
            return R.ok();
        } catch (Exception e) {
            log.error("Delete library error", e);
            return R.err(e);
        }
    }

    @PutMapping("/{id}")
    public R<Void> updateLibrary(@PathVariable int id, @RequestBody Library library) {
        try {
            log.info("Update library {}, {}", id, library);
            libraryService.updateLibrary(id, library);
            return R.ok();
        } catch (Exception e) {
            log.error("Update library error", e);
            return R.err(e);
        }
    }

    @GetMapping("")
    public R<List<Library>> getAllLibraries() {
        try {
            log.info("Get all libraries");
            List<Library> libraries = libraryService.getAllLibraries();
            return R.ok(libraries);
        } catch (Exception e) {
            log.error("Get all libraries error", e);
            return R.err(e);
        }
    }

    @GetMapping("/{id}")
    public R<Library> getLibrary(@PathVariable int id) {
        try {
            log.info("Get library {}", id);
            Library library = libraryService.getLibrary(id);
            return R.ok(library);
        } catch (Exception e) {
            log.error("Get library error", e);
            return R.err(e);
        }
    }

    @GetMapping("/{id}/scanManga")
    public R<Void> scanManga(@PathVariable int id) {
        try {
            log.info("Scan manga in library {}", id);
            libraryService.scanManga(id);
            return R.ok();
        } catch (Exception e) {
            log.error("Scan manga in library error", e);
            return R.err(e);
        }
    }

    @GetMapping("/{id}/listManga")
    public R<List<Manga>> listManga(@PathVariable int id) {
        try {
            log.info("List manga in library {}", id);
            List<Manga> mangas = libraryService.listManga(id);
            return R.ok(mangas);
        } catch (Exception e) {
            log.error("List manga in library error", e);
            return R.err(e);
        }
    }
}
