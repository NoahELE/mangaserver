package com.noahele.mangaserver.service;

import com.google.common.io.Files;
import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.exception.CustomIOException;
import com.noahele.mangaserver.exception.OwnerNotMatchException;
import com.noahele.mangaserver.repository.LibraryRepository;
import com.noahele.mangaserver.utils.CurrUserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class LibraryService {
    private static final Set<String> SUPPORTED_FORMATS = Set.of("zip");
    private static final Sort LIBRARY_SORT = Sort.sort(Library.class).by(Library::getName).ascending();
    private final LibraryRepository libraryRepository;
    private final MangaService mangaService;

    @Autowired
    public LibraryService(LibraryRepository libraryRepository, @Lazy MangaService mangaService) {
        this.libraryRepository = libraryRepository;
        this.mangaService = mangaService;
    }

    public void addLibrary(Library library) {
        assert library.getId() == null;
        libraryRepository.save(library);
    }

    public void deleteLibrary(int id) throws OwnerNotMatchException {
        getLibrary(id); // check if the user can access the library
        libraryRepository.deleteById(id);
    }

    public void updateLibrary(int id, Library library) throws OwnerNotMatchException {
        getLibrary(id); // check if the user can access the library
        assert library.getId() == null;
        library.setId(id);
        libraryRepository.save(library);
    }

    public Library getLibrary(int id) throws OwnerNotMatchException {
        Library library = libraryRepository.findById(id).orElseThrow();
        User user = CurrUserFacade.getUser();
        if (user == null || !user.equals(library.getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        return library;
    }

    public Page<Library> getAllLibraries(int page, int size) {
        User user = CurrUserFacade.getUser();
        PageRequest pageRequest = PageRequest.of(page, size, LIBRARY_SORT);
        return libraryRepository.findAllByOwner(user, pageRequest);
    }

    public void scanManga(int id) {
        Library library = getLibrary(id);
        File currDir = new File(library.getPath());
        // check whether it is a valid directory
        assert currDir.isDirectory();
        List<Manga> mangaList = new ArrayList<>();
        scanMangaRecursive(mangaList, currDir, library);
        mangaList = mangaList.stream().filter((manga) -> !mangaService.existsByPath(manga.getPath())).toList();
        mangaService.addAllManga(mangaList, id);
    }

    private void scanMangaRecursive(List<Manga> mangaList, File currDir, Library library) {
        try {
            for (File file : Objects.requireNonNull(currDir.listFiles())) {
                if (file.isDirectory()) {
                    scanMangaRecursive(mangaList, file, library);
                } else if (SUPPORTED_FORMATS.contains(Files.getFileExtension(file.getName()))) {
                    mangaList.add(Manga.fromFile(file, library));
                }
            }
        } catch (IOException e) {
            throw new CustomIOException(e);
        }
    }
}
