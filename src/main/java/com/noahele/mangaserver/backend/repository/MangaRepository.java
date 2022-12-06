package com.noahele.mangaserver.backend.repository;

import com.noahele.mangaserver.backend.entity.Library;
import com.noahele.mangaserver.backend.entity.Manga;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MangaRepository extends JpaRepository<Manga, Integer> {
    boolean existsByPath(String path);

    List<Manga> findAllByLibrary(Library library);
}
