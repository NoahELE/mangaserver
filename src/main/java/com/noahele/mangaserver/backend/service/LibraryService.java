package com.noahele.mangaserver.backend.service;

import com.google.common.io.Files;
import com.noahele.mangaserver.backend.entity.Library;
import com.noahele.mangaserver.backend.entity.Manga;
import com.noahele.mangaserver.backend.repository.LibraryRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class LibraryService {
    private final LibraryRepository repo;
    private final MangaService mangaService;
    private static final Set<String> SUPPORTED_FORMATS = Set.of("zip");

    public LibraryService(LibraryRepository repo, MangaService mangaService) {
        this.repo = repo;
        this.mangaService = mangaService;
    }

    public List<Library> getAllLibraries() {
        return new ArrayList<>(repo.findAll());
    }

    public Library getLibraryById(Integer id) {
        return repo.findById(id).orElseThrow();
    }

    public void addLibrary(Library library) {
        repo.save(library);
    }

    public List<Manga> listManga(Integer id) {
        return repo.findById(id).orElseThrow().getMangas();
    }

    public void scanManga(Integer id) {
        Library library = getLibraryById(id);
        File currDir = new File(library.getPath());
        // check whether it is a valid directory
        if (!currDir.isDirectory()) {
            throw new RuntimeException("library path %s is not a directory".formatted(library.getPath()));
        }
        List<Manga> fileList = new ArrayList<>();
        scanMangaRecursive(fileList, currDir, library);
        fileList.forEach(mangaService::addManga);
    }

    private void scanMangaRecursive(List<Manga> fileList, File currDir, Library library) {
        for (File f : Objects.requireNonNull(currDir.listFiles())) {
            if (f.isDirectory()) {
                scanMangaRecursive(fileList, f, library);
            } else if (SUPPORTED_FORMATS.contains(Files.getFileExtension(f.getName()))) {
                fileList.add(new Manga(f, library));
            }
        }
    }

    public void deleteLibrary(Integer id) {
        repo.deleteById(id);
    }

    public void updateLibrary(Integer id, Library library) {
        library.setId(id);
        repo.save(library);
    }
}
