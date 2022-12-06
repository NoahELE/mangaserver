package com.noahele.mangaserver.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
public class Library {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String path;
    @OneToMany(mappedBy = "library")
    @JsonIgnore
    List<Manga> mangas;

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
