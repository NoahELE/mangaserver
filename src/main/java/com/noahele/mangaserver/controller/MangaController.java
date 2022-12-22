package com.noahele.mangaserver.controller;

import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.service.MangaService;
import com.noahele.mangaserver.util.MyUserDetails;
import com.noahele.mangaserver.util.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/manga")
public class MangaController {
    private final MangaService mangaService;

    public MangaController(MangaService mangaService) {
        this.mangaService = mangaService;
    }

    @PostMapping("")
    public Response<?> addManga(@RequestBody Manga manga,
                                int libraryId,
                                @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} add manga {} to library {}", user, manga, libraryId);
            mangaService.addManga(manga, libraryId, user);
            return Response.ok();
        } catch (Exception e) {
            log.error("Add manga error", e);
            return Response.err(e);
        }
    }

    @DeleteMapping("/{id}")
    public Response<?> deleteManga(@PathVariable int id,
                                   @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} delete manga {}", user, id);
            mangaService.deleteManga(id, user);
            return Response.ok();
        } catch (Exception e) {
            log.error("Delete manga error", e);
            return Response.err(e);
        }
    }

    @PutMapping("/{id}")
    public Response<?> updateManga(@PathVariable int id,
                                   @RequestBody Manga manga,
                                   @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} update manga {}", user, manga);
            mangaService.updateManga(id, manga, user);
            return Response.ok();
        } catch (Exception e) {
            log.error("Update manga error", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}")
    public Response<Manga> getManga(@PathVariable int id,
                                    @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} Get manga {}", user, id);
            Manga manga = mangaService.getManga(id, user);
            return Response.ok(manga);
        } catch (Exception e) {
            log.error("Get manga error", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/page")
    public Response<List<String>> getAllMangaPageNames(@PathVariable int id,
                                                       @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("User {} get all pages from manga {}", user, id);
            List<String> mangaPageNames = mangaService.getAllMangaPageNames(id, user);
            return Response.ok(mangaPageNames);
        } catch (Exception e) {
            log.error("Get manga page names error: ", e);
            return Response.err(e);
        }
    }

    @GetMapping("/{id}/page/{pageIndex}")
    public ResponseEntity<byte[]> getMangaPage(@PathVariable int id,
                                               @PathVariable int pageIndex,
                                               @AuthenticationPrincipal MyUserDetails myUserDetails) {
        try {
            User user = myUserDetails.user();
            log.info("Get page {} from manga with id {}", pageIndex, id);
            return ResponseEntity.ok()
                    .contentType(mangaService.getMangaPageExt(id, pageIndex, user))
                    .body(mangaService.getMangaPage(id, pageIndex, user));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
