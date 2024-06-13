package com.noahele.mangaserver.domain.library;

import com.noahele.mangaserver.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Library, Integer> {
  Page<Library> findAllByOwner(User owner, Pageable pageable);
}
