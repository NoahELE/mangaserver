package com.noahele.mangaserver.domain.series;

import com.noahele.mangaserver.domain.library.Library;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeriesRepository extends JpaRepository<Series, Integer> {
    Page<Series> findAllByLibrary(Library library, Pageable pageable);
}
