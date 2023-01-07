package com.noahele.mangaserver.service;

import com.google.common.io.Files;
import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.exception.OwnerNotMatchException;
import com.noahele.mangaserver.repository.LibraryRepository;
import com.noahele.mangaserver.utils.CurrUserFacade;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class LibraryService {
    private static final Set<String> SUPPORTED_FORMATS = Set.of("zip");
    private final LibraryRepository libraryRepository;
    private final MangaService mangaService;

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
        if (!user.equals(library.getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        return library;
    }

    public List<Manga> listManga(int id) throws OwnerNotMatchException {
        return getLibrary(id).getMangaList();
    }

    public List<Library> getAllLibraries() {
        User user = CurrUserFacade.getUser();
        return libraryRepository.findAllByOwner(user);
    }

    public void scanManga(int id) throws OwnerNotMatchException {
        Library library = getLibrary(id);
        File currDir = new File(library.getPath());
        // check whether it is a valid directory
        assert currDir.isDirectory();
        List<Manga> mangaList = new ArrayList<>();
        scanMangaRecursive(mangaList, currDir, library);
        mangaService.addAllManga(mangaList, id);
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
