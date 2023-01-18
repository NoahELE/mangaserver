package com.noahele.mangaserver.entity;

import com.google.common.io.Files;
import com.noahele.mangaserver.utils.reader.MangaReader;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.io.File;
import java.io.IOException;
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
    private String path;
    @NotBlank
    @Column(nullable = false)
    private String ext;
    @NotBlank
    @Column(nullable = false)
    private Integer numOfPages;
    @ManyToOne
    @JoinColumn(nullable = false)
    private Library library;

    public static Manga fromFile(File mangaFile, Library library) throws IOException {
        String filename = mangaFile.getName();
        String name = Files.getNameWithoutExtension(filename);
        String ext = Files.getFileExtension(filename);
        String path = mangaFile.getPath();
        try (MangaReader reader = MangaReader.getByPath(path)) {
            int numOfPages = reader.getNumOfPages();
            return new Manga(name, path, ext, numOfPages, library);
        }
    }

    public Manga(String name, String path, String ext, int numOfPages, Library library) {
        this.name = name;
        this.path = path;
        this.ext = ext;
        this.numOfPages = numOfPages;
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
