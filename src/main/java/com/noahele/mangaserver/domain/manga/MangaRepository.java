package com.noahele.mangaserver.domain.manga;

import com.noahele.mangaserver.domain.library.Library;
import com.noahele.mangaserver.domain.series.Series;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MangaRepository extends JpaRepository<Manga, Integer> {
  boolean existsByPath(String path);

  Page<Manga> findAllByLibrary(Library library, Pageable pageable);

  Page<Manga> findAllBySeriesListContaining(Series series, Pageable pageable);
}
