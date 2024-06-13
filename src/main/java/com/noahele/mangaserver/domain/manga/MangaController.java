package com.noahele.mangaserver.domain.manga;

import com.noahele.mangaserver.utils.MangaPageInfo;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/manga")
@Slf4j
@RequiredArgsConstructor
public class MangaController {
  private final MangaService mangaService;

  @PostMapping("")
  @Operation(summary = "Add a manga")
  public void addManga(@RequestBody Manga manga, int libraryId) {
    log.info("Add manga to library, manga = {}, libraryId = {}", manga, libraryId);
    mangaService.addManga(manga, libraryId);
  }

  @DeleteMapping("/{mangaId}")
  @Operation(summary = "Delete a manga")
  public void deleteManga(@PathVariable int mangaId) {
    log.info("Delete manga, mangaId = {}", mangaId);
    mangaService.deleteManga(mangaId);
  }

  @PutMapping("/{mangaId}")
  @Operation(summary = "Update a manga")
  public void updateManga(@PathVariable int mangaId, @RequestBody Manga manga) {
    log.info("Update manga, mangaId = {}, manga = {}", mangaId, manga);
    mangaService.updateManga(mangaId, manga);
  }

  @GetMapping("")
  @Operation(summary = "Get all manga by library or series")
  public Page<Manga> getAllManga(
      Optional<Integer> libraryId, Optional<Integer> seriesId, int page, int size) {
    if (libraryId.isPresent()) {
      log.info(
          "Get manga from library, libraryId = {}, page = {}, size = {}", libraryId, page, size);
      return mangaService.getAllMangaByLibrary(libraryId.get(), page, size);
    } else if (seriesId.isPresent()) {
      log.info("Get manga by series, seriesId = {}, page = {}, size = {}", seriesId, page, size);
      return mangaService.getAllMangaBySeries(seriesId.get(), page, size);
    } else {
      throw new RuntimeException("both libraryId and seriesId are present");
    }
  }

  @GetMapping("/{mangaId}")
  @Operation(summary = "Get manga by id")
  public Manga getManga(@PathVariable int mangaId) {
    log.info("Get manga, mangaId = {}", mangaId);
    return mangaService.getManga(mangaId);
  }

  @GetMapping("/{mangaId}/page/{pageIndex}")
  @Operation(summary = "Get a page from manga")
  public ResponseEntity<byte[]> getMangaPage(
      @PathVariable int mangaId, @PathVariable int pageIndex) {
    log.info("Get page from manga, mangaId = {}, pageIndex = {}", mangaId, pageIndex);
    MangaPageInfo mangaPageInfo = mangaService.getMangaPage(mangaId, pageIndex);
    return ResponseEntity.ok().contentType(mangaPageInfo.type()).body(mangaPageInfo.page());
  }

  @PostMapping("/upload")
  public void uploadManga(MultipartFile file, int libraryId) {
    log.info("Upload a manga file to library, libraryId = {}", libraryId);
    mangaService.uploadManga(file, libraryId);
  }
}
