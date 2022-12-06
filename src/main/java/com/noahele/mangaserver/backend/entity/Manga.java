package com.noahele.mangaserver.backend.entity;

import com.google.common.io.Files;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.File;
import java.util.Objects;

@Getter
@Setter
@Entity
public class Manga {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String path;
    private String ext;
    @ManyToOne
    private Library library;

    public Manga(String name, String path, String ext, Library library) {
        this.name = name;
        this.path = path;
        this.ext = ext;
        this.library = library;
    }

    protected Manga() {
    }

    public Manga(File mangaFile, Library library) {
        this.name = Files.getFileExtension(mangaFile.getName());
        this.path = mangaFile.getPath();
        this.ext = Files.getNameWithoutExtension(mangaFile.getName());
        this.library = library;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Manga manga = (Manga) o;
        return id != null && Objects.equals(id, manga.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
