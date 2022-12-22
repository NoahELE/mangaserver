package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.service.LibraryService;
import com.noahele.mangaserver.util.MyUserDetails;
import com.noahele.mangaserver.util.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public Response<?> addLibrary(@RequestBody Library library,
                                  @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            library.setOwner(user);
            log.info("User {} add library {}", user, library);
            libraryService.addLibrary(library);
            return Response.ok();
        } catch (Exception e) {
            log.error("Add library error ", e);
            return Response.err(e);
        }
    }

    @DeleteMapping("/{id}")
    public Response<?> deleteLibrary(@PathVariable int id,
                                     @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} delete library {}", user, id);
            libraryService.deleteLibrary(id, user);
            return Response.ok();
        } catch (Exception e) {
            log.error("Delete library error ", e);
            return Response.err(e);
        }
    }

    @PutMapping("/{id}")
    public Response<?> updateLibrary(@PathVariable int id,
                                     @RequestBody Library library,
                                     @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} update library {}, {}", user, id, library);
            libraryService.updateLibrary(id, library, user);
            return Response.ok();
        } catch (Exception e) {
            log.error("Update library error ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}")
    public Response<Library> getLibrary(@PathVariable int id,
                                        @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} get library {}", user, id);
            Library library = libraryService.getLibrary(id, user);
            return Response.ok(library);
        } catch (Exception e) {
            log.error("Get library error", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/scanManga")
    public Response<?> scanManga(@PathVariable int id,
                                 @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} scan manga in library {}", user, id);
            libraryService.scanManga(id, user);
            return Response.ok();
        } catch (Exception e) {
            log.error("Scan manga in library error", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/listManga")
    public Response<List<Manga>> listManga(@PathVariable int id,
                                           @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} list manga in library {}", user, id);
            List<Manga> mangas = libraryService.listManga(id, user);
            return Response.ok(mangas);
        } catch (Exception e) {
            log.error("List manga in library error", e);
            return Response.err(e);
        }
    }
}
