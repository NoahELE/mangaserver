package com.noahele.mangaserver.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Library extends BaseEntity {
    private String name;
    private String path;
    @ToString.Exclude
    @JsonIgnore
    @OneToMany(mappedBy = "library")
    List<Manga> mangaList;

    public Library(String name, String path) {
        this.name = name;
        this.path = path;
    }

    protected Library() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Library library = (Library) o;
        return id != null && Objects.equals(id, library.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
