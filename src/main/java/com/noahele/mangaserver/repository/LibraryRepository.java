package com.noahele.mangaserver.repository;

import com.noahele.mangaserver.entity.Library;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Library, Integer> {
    @Override
    void deleteById(@NonNull Integer id);
}
