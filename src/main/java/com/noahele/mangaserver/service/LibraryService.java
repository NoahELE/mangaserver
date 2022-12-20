package com.noahele.mangaserver.service;

import com.google.common.io.Files;
import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.repository.LibraryRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class LibraryService {
    private final LibraryRepository libraryRepository;
    private final MangaService mangaService;
    private static final Set<String> SUPPORTED_FORMATS = Set.of("zip");

    public LibraryService(LibraryRepository libraryRepository, MangaService mangaService) {
        this.libraryRepository = libraryRepository;
        this.mangaService = mangaService;
    }

    public void addLibrary(Library library) {
        assert library.getId() != null;
        libraryRepository.save(library);
    }

    public void deleteLibrary(int id) {
        libraryRepository.deleteById(id);
    }

    public void updateLibrary(int id, Library library) {
        assert library.getId() == null;
        library.setId(id);
        libraryRepository.save(library);
    }

    public Library getLibrary(int id) {
        return libraryRepository.findById(id).orElseThrow();
    }

    public List<Library> getAllLibraries() {
        return libraryRepository.findAll();
    }

    public List<Manga> listManga(int id) {
        return libraryRepository.findById(id).orElseThrow().getMangaList();
    }

    public void scanManga(int id) {
        Library library = getLibrary(id);
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
                mangaList.add(Manga.fromFile(file, library));
            }
        }
    }
}
