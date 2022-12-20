package com.noahele.mangaserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.io.Files;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
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
public class Manga extends BaseEntity {
    @NotBlank
    @Column(nullable = false)
    private String name;
    @NotBlank
    @Column(nullable = false)
    private String ext;
    @NotBlank
    @Column(nullable = false)
    private String path;
    @ToString.Exclude
    @JsonIgnore
    private byte[] cover;
    @ManyToOne
    private Library library;

    public static Manga fromFile(File mangaFile, Library library) {
        String name = Files.getNameWithoutExtension(mangaFile.getName());
        String ext = Files.getFileExtension(mangaFile.getName());
        return new Manga(name, ext, mangaFile.getPath(), library);
    }

    public Manga(String name, String ext, String path, Library library) {
        this.name = name;
        this.ext = ext;
        this.path = path;
        this.library = library;
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
