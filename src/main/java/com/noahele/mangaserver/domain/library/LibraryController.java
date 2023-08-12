package com.noahele.mangaserver.domain.library;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/library")
@Slf4j
@RequiredArgsConstructor
public class LibraryController {
    private final LibraryService libraryService;

    @PostMapping("")
    @Operation(summary = "Add a library")
    public void addLibrary(@RequestBody Library library) {
        log.info("Add library, library = {}", library);
        libraryService.addLibrary(library);
    }

    @DeleteMapping("/{libraryId}")
    @Operation(summary = "Delete a library")
    public void deleteLibrary(@PathVariable int libraryId) {
        log.info("Delete library, libraryId = {}", libraryId);
        libraryService.deleteLibrary(libraryId);
    }

    @PutMapping("/{libraryId}")
    @Operation(summary = "Update a library")
    public void updateLibrary(@PathVariable int libraryId, @RequestBody Library library) {
        log.info("Update library, id = {}, library = {}", libraryId, library);
        libraryService.updateLibrary(libraryId, library);
    }

    @GetMapping("")
    @Operation(summary = "Get all libraries of current user")
    public Page<Library> getAllLibraries(int page, int size) {
        log.info("Get all libraries, page = {}, size = {}", page, size);
        return libraryService.getAllLibraries(page, size);
    }

    @GetMapping("/{libraryId}")
    @Operation(summary = "Get library by id")
    public Library getLibrary(@PathVariable int libraryId) {
        log.info("Get library, id= {}", libraryId);
        return libraryService.getLibrary(libraryId);
    }

    @GetMapping("/{libraryId}/scanManga")
    @Operation(summary = "Scan manga in library")
    public void scanManga(@PathVariable int libraryId) {
        log.info("Scan manga in library, id = {}", libraryId);
        libraryService.scanManga(libraryId);
    }
}
