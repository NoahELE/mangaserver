package com.noahele.mangaserver.repository;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LibraryRepository extends JpaRepository<Library, Integer> {
    @Override
    void deleteById(@NonNull Integer id);

    List<Library> findAllByOwner(User owner);
}
