package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.service.LibraryService;
import com.noahele.mangaserver.util.Response;
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
    public Response<?> addLibrary(@RequestBody Library library) {
        try {
            log.info("Add library: {}", library);
            libraryService.addLibrary(library);
            return Response.ok();
        } catch (Exception e) {
            log.error("Add library error: ", e);
            return Response.err(e);
        }
    }

    @DeleteMapping("/{id}")
    public Response<?> deleteLibrary(@PathVariable int id) {
        try {
            log.info("Delete library: {}", id);
            libraryService.deleteLibrary(id);
            return Response.ok();
        } catch (Exception e) {
            log.error("Delete library error: ", e);
            return Response.err(e);
        }
    }

    @PutMapping("/{id}")
    public Response<?> updateLibrary(@PathVariable int id, @RequestBody Library library) {
        try {
            log.info("Update library: {}; {}", id, library);
            libraryService.updateLibrary(id, library);
            return Response.ok();
        } catch (Exception e) {
            log.error("Update library error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}")
    public Response<Library> getLibrary(@PathVariable int id) {
        try {
            log.info("Get library: {}", id);
            Library library = libraryService.getLibrary(id);
            return Response.ok(library);
        } catch (Exception e) {
            log.error("Get library error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("")
    public Response<List<Library>> getAllLibraries() {
        try {
            log.info("Get all libraries");
            List<Library> libraries = libraryService.getAllLibraries();
            return Response.ok(libraries);
        } catch (Exception e) {
            log.error("Get all libraries error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/scanManga")
    public Response<?> scanManga(@PathVariable int id) {
        try {
            log.info("Scan manga in library: {}", id);
            libraryService.scanManga(id);
            return Response.ok();
        } catch (Exception e) {
            log.error("Scan manga in library error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/listManga")
    public Response<List<Manga>> listManga(@PathVariable int id) {
        try {
            log.info("List manga in library: {}", id);
            List<Manga> mangas = libraryService.listManga(id);
            return Response.ok(mangas);
        } catch (Exception e) {
            log.error("List manga in library error: ", e);
            return Response.err(e);
        }
    }
}
