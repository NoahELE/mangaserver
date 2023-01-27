package com.noahele.mangaserver.repository;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MangaRepository extends JpaRepository<Manga, Integer> {
    boolean existsByPath(String path);

    Page<Manga> findAllByLibrary(Library library, Pageable pageable);
}
