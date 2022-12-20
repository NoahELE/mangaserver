package com.noahele.mangaserver.repository;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MangaRepository extends JpaRepository<Manga, Integer> {
    boolean existsByPath(@NonNull String path);

    List<Manga> findAllByLibrary(@NonNull Library library);
}
