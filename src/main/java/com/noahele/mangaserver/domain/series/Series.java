package com.noahele.mangaserver.domain.series;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.noahele.mangaserver.domain.BaseEntity;
import com.noahele.mangaserver.domain.library.Library;
import com.noahele.mangaserver.domain.manga.Manga;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(indexes = @Index(columnList = "library_id"))
public class Series extends BaseEntity {
    @NotBlank
    @Column(nullable = false)
    public String name;

    @ManyToOne
    @NotNull
    @JoinColumn(nullable = false)
    public Library library;

    @JsonIgnore
    @ManyToMany
    @JoinTable
    public List<Manga> mangaList;

    public Series(String name) {
        this.name = name;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass =
                o instanceof HibernateProxy
                        ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass()
                        : o.getClass();
        Class<?> thisEffectiveClass =
                this instanceof HibernateProxy
                        ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass()
                        : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Series series = (Series) o;
        return getId() != null && Objects.equals(getId(), series.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
