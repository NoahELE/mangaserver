package com.noahele.mangaserver.domain.library;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.noahele.mangaserver.domain.BaseEntity;
import com.noahele.mangaserver.domain.manga.Manga;
import com.noahele.mangaserver.domain.series.Series;
import com.noahele.mangaserver.domain.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Library extends BaseEntity {
    @NotBlank
    @Column(nullable = false)
    private String name;
    @NotBlank
    @Column(nullable = false)
    private String path;
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "library")
    private List<Manga> mangaList;
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "library")
    private List<Series> seriesList;
    @JsonIgnore
    @CreatedBy
    @ManyToOne
    @NotNull
    @JoinColumn(nullable = false)
    private User owner;

    protected Library() {
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
        Library library = (Library) o;
        return getId() != null && Objects.equals(getId(), library.getId());
    }

    @Override
    public final int hashCode() {
        return getClass().hashCode();
    }
}
