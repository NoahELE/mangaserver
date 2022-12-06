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

    public void addLibrary(Library library) {
        repo.save(library);
    }

    public void deleteLibrary(int id) {
        repo.deleteById(id);
    }

    public void updateLibrary(int id, Library library) {
        library.setId(id);
        repo.save(library);
    }

    public List<Library> getAllLibraries() {
        return new ArrayList<>(repo.findAll());
    }

    public Library getLibraryById(int id) {
        return repo.findById(id).orElseThrow();
    }

    public List<Manga> listManga(int id) {
        return repo.findById(id).orElseThrow().getMangas();
    }

    public void scanManga(int id) {
        Library library = getLibraryById(id);
        File currDir = new File(library.getPath());
        // check whether it is a valid directory
        assert currDir.isDirectory();
        List<Manga> mangaList = new ArrayList<>();
        scanMangaRecursive(mangaList, currDir, library);
        mangaService.addAllManga(mangaList);
    }

    private void scanMangaRecursive(List<Manga> mangaList, File currDir, Library library) {
        for (File file : Objects.requireNonNull(currDir.listFiles())) {
            if (file.isDirectory()) {
                scanMangaRecursive(mangaList, file, library);
            } else if (SUPPORTED_FORMATS.contains(Files.getFileExtension(file.getName()))) {
                mangaList.add(new Manga(file, library));
            }
        }
    }
}
