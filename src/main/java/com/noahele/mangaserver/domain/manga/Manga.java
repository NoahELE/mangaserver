package com.noahele.mangaserver.domain.manga;

import com.google.common.io.MoreFiles;
import com.noahele.mangaserver.domain.BaseEntity;
import com.noahele.mangaserver.domain.library.Library;
import com.noahele.mangaserver.domain.series.Series;
import com.noahele.mangaserver.exception.RuntimeIOException;
import com.noahele.mangaserver.utils.reader.MangaReader;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(indexes = @Index(columnList = "library_id"))
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
    @ManyToMany(mappedBy = "mangaList", cascade = {
            CascadeType.DETACH,
            CascadeType.MERGE,
            CascadeType.PERSIST,
            CascadeType.REFRESH
    })
    private List<Series> seriesList;
    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private Library library;

    public static Manga fromPath(Path path, Library library) {
        String name = MoreFiles.getNameWithoutExtension(path);
        String ext = MoreFiles.getFileExtension(path);
        Series series = new Series(path.getParent().getFileName().toString());
        try (MangaReader reader = MangaReader.fromPath(path)) {
            int numOfPages = reader.getNumOfPages();
            return new Manga(name, path.toString(), ext, numOfPages, List.of(series), library);
        } catch (IOException e) {
            throw new RuntimeIOException(e);
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
