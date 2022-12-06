package com.noahele.mangaserver.backend.entity;

import com.google.common.io.Files;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.io.File;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
public class Manga {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String ext;
    private String path;
    @ManyToOne
    private Library library;

    public Manga(String name, String ext, String path, Library library) {
        this.name = name;
        this.ext = ext;
        this.path = path;
        this.library = library;
    }

    public Manga(File mangaFile, Library library) {
        this(Files.getFileExtension(mangaFile.getName()),
                Files.getNameWithoutExtension(mangaFile.getName()),
                mangaFile.getPath(),
                library);
    }

    protected Manga() {
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
