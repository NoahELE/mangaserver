package com.noahele.mangaserver.repository;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MangaRepository extends JpaRepository<Manga, Integer> {
    boolean existsByPath(String path);

    List<Manga> findAllByLibrary(Library library);
}
