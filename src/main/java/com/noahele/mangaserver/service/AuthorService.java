package com.noahele.mangaserver.service;

import com.noahele.mangaserver.entity.Author;
import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
    private static final Sort AUTHOR_SORT = Sort.sort(Author.class).by(Author::getName).ascending();
    private final AuthorRepository authorRepository;
    private final LibraryService libraryService;

    @Autowired
    public AuthorService(AuthorRepository authorRepository, LibraryService libraryService) {
        this.authorRepository = authorRepository;
        this.libraryService = libraryService;
    }

    public Page<Author> getAllAuthorsByLibrary(int libraryId, int page, int size) {
        Library library = libraryService.getLibrary(libraryId);
        PageRequest pageRequest = PageRequest.of(page, size, AUTHOR_SORT);
        return authorRepository.findAllByLibrary(library, pageRequest);
    }

    public Author getAuthor(int id) {
        return authorRepository.findById(id).orElseThrow();
    }
}
