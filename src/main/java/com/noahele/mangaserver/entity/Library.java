package com.noahele.mangaserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
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
    @JsonIgnore
    @CreatedBy
    @ManyToOne
    @NotNull
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
