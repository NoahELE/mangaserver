package com.noahele.mangaserver.backend.repository;

import com.noahele.mangaserver.backend.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Library, Integer> {
}
