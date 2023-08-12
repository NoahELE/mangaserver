package com.noahele.mangaserver.domain.manga;

import com.google.common.io.Files;
import com.noahele.mangaserver.domain.BaseEntity;
import com.noahele.mangaserver.domain.library.Library;
import com.noahele.mangaserver.domain.series.Series;
import com.noahele.mangaserver.utils.reader.MangaReader;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Manga extends BaseEntity {
    @Column(nullable = false)
    @NotBlank
    private String name;
    @Column(nullable = false, unique = true)
    @NotBlank
    private String path;
    @Column(nullable = false)
    @NotBlank
    private String ext;
    @Column(nullable = false)
    @Positive
    private int numOfPages;
    @ManyToMany(mappedBy = "mangaList", cascade = {CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @ToString.Exclude
    private List<Series> seriesList;
    @ManyToOne
    @JoinColumn(nullable = false)
    @NotNull
    private Library library;

    public static Manga fromFile(File file, Library library) throws IOException {
        String filename = file.getName();
        String name = Files.getNameWithoutExtension(filename);
        String ext = Files.getFileExtension(filename);
        String path = file.getPath();
        Series series = new Series(file.getParentFile().getName());
        try (MangaReader reader = MangaReader.fromFile(file)) {
            int numOfPages = reader.getNumOfPages();
            return new Manga(name, path, ext, numOfPages, List.of(series), library);
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
