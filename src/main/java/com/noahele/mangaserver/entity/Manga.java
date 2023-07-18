package com.noahele.mangaserver.entity;

import com.google.common.io.Files;
import com.noahele.mangaserver.utils.reader.MangaReader;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.proxy.HibernateProxy;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
    @Column(nullable = false, unique = true)
    private String path;
    @NotBlank
    @Column(nullable = false)
    private String ext;
    @Positive
    @Column(nullable = false)
    private int numOfPages;
    @ToString.Exclude
    @ManyToMany(mappedBy = "mangaList", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.REFRESH})
    private List<Author> authorList;
    @ManyToOne
    @NotNull
    @JoinColumn(nullable = false)
    private Library library;

    protected Manga() {
    }

    private Manga(String name, String path, String ext, int numOfPages,
                  @NotNull Library library) {
        this.name = name;
        this.path = path;
        this.ext = ext;
        this.numOfPages = numOfPages;
        this.authorList = new ArrayList<>();
        this.library = library;
    }

    public static Manga fromFile(File file, Library library)
            throws IOException {
        String filename = file.getName();
        String name = Files.getNameWithoutExtension(filename);
        String ext = Files.getFileExtension(filename);
        String path = file.getPath();
        Author author = new Author(file.getParentFile().getName());
        try (MangaReader reader = MangaReader.getByPath(path)) {
            int numOfPages = reader.getNumOfPages();
            Manga manga = new Manga(name, path, ext, numOfPages, library);
            manga.authorList.add(author);
            return manga;
        }
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ?
                ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() :
                o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ?
                ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() :
                this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Manga manga = (Manga) o;
        return getId() != null && Objects.equals(getId(), manga.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
