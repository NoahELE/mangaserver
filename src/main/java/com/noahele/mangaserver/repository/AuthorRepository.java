package com.noahele.mangaserver.repository;

import com.noahele.mangaserver.entity.Author;
import com.noahele.mangaserver.entity.Library;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
    Page<Author> findAllByLibrary(Library library, Pageable pageable);
}
