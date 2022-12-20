package com.noahele.mangaserver.repository;

import com.noahele.mangaserver.entity.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(@NonNull String username);
}
