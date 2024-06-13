package com.noahele.mangaserver.domain.series;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/series")
@Slf4j
@RequiredArgsConstructor
public class SeriesController {
  private final SeriesService seriesService;

  @GetMapping("")
  @Operation(summary = "Get all series from a library")
  public Page<Series> getAllSeriesByLibrary(int libraryId, int page, int size) {
    log.info("Get all series, libraryId = {}, page = {}, size = {}", libraryId, page, size);
    return seriesService.getAllSeriesByLibrary(libraryId, page, size);
  }
}
