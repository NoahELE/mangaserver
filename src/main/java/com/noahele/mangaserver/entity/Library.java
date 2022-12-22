package com.noahele.mangaserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
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
    @JoinColumn(nullable = false)
    private List<Manga> mangaList;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User owner;

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
