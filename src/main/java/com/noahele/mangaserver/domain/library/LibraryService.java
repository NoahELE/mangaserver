package com.noahele.mangaserver.domain.library;

import com.google.common.io.Files;
import com.noahele.mangaserver.domain.manga.Manga;
import com.noahele.mangaserver.domain.manga.MangaService;
import com.noahele.mangaserver.domain.user.User;
import com.noahele.mangaserver.exception.CustomIOException;
import com.noahele.mangaserver.exception.UserOwnershipException;
import com.noahele.mangaserver.security.SecurityUtils;
import com.noahele.mangaserver.utils.reader.MangaReader;
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

@Service
public class LibraryService {
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

    public void deleteLibrary(int libraryId) {
        getLibrary(libraryId); // check if the user can access the library
        libraryRepository.deleteById(libraryId);
    }

    public void updateLibrary(int libraryId, Library library) {
        getLibrary(libraryId); // check if the user can access the library
        assert library.getId() == null;
        library.setId(libraryId);
        libraryRepository.save(library);
    }

    public Library getLibrary(int libraryId) {
        Library library = libraryRepository.findById(libraryId).orElseThrow();
        User user = SecurityUtils.getCurrentUser();
        if (user == null || !user.equals(library.getOwner())) {
            throw new UserOwnershipException(user);
        }
        return library;
    }

    public Page<Library> getAllLibraries(int page, int size) {
        User user = SecurityUtils.getCurrentUser();
        PageRequest pageRequest = PageRequest.of(page, size, LIBRARY_SORT);
        return libraryRepository.findAllByOwner(user, pageRequest);
    }

    public void scanManga(int libraryId) {
        Library library = getLibrary(libraryId);
        deleteInvalidManga(library);
        File currDir = new File(library.getPath());
        // check whether it is a valid directory
        assert currDir.isDirectory();
        List<Manga> mangaList = new ArrayList<>();
        scanMangaRecursive(mangaList, currDir, library);
        mangaList = mangaList.stream().filter((manga) -> !mangaService.existsByPath(manga.getPath())).toList();
        mangaService.addAllManga(mangaList, libraryId);
    }

    private void scanMangaRecursive(List<Manga> mangaList, File currDir, Library library) {
        try {
            for (File file : Objects.requireNonNull(currDir.listFiles())) {
                if (file.isDirectory()) {
                    scanMangaRecursive(mangaList, file, library);
                } else if (MangaReader.SUPPORTED_FORMATS.contains(Files.getFileExtension(file.getName()))) {
                    mangaList.add(Manga.fromFile(file, library));
                }
            }
        } catch (IOException e) {
            throw new CustomIOException(e);
        }
    }

    private void deleteInvalidManga(Library library) {
        List<Manga> mangaList = library.getMangaList();
        for (Manga manga : mangaList) {
            File mangaFile = new File(manga.getPath());
            if (!mangaFile.exists()) {
                mangaService.deleteManga(manga.getId());
            }
        }
    }
}
