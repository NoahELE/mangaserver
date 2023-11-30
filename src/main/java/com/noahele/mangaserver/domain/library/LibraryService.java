package com.noahele.mangaserver.domain.library;

import com.google.common.io.MoreFiles;
import com.noahele.mangaserver.domain.manga.Manga;
import com.noahele.mangaserver.domain.manga.MangaService;
import com.noahele.mangaserver.domain.user.User;
import com.noahele.mangaserver.exception.RuntimeIOException;
import com.noahele.mangaserver.exception.UserOwnershipException;
import com.noahele.mangaserver.security.SecurityUtils;
import com.noahele.mangaserver.utils.reader.MangaReader;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class LibraryService {
    private static final Sort LIBRARY_SORT = Sort.sort(Library.class).by(Library::getName).ascending();
    private final LibraryRepository libraryRepository;
    @Setter // use setter injection to prevent circular dependency
    private MangaService mangaService;

    public void addLibrary(Library library) {
        assert library.getId() == null;
        libraryRepository.save(library);
    }

    public void deleteLibrary(int libraryId) {
        libraryRepository.deleteById(libraryId);
    }

    public void updateLibrary(int libraryId, Library library) {
        assert library.getId() == null;
        libraryRepository
                .findById(libraryId)
                .map(l -> {
                    library.setId(l.getId());
                    return libraryRepository.save(library);
                })
                .orElseThrow();
    }

    public Library getLibrary(int libraryId) {
        Library library = libraryRepository.findById(libraryId).orElseThrow();
        User user = SecurityUtils.getCurrentUser();
        if (user == null || !user.equals(library.getOwner())) {
            throw new UserOwnershipException(user);
        }
        return library;
    }

    public Library getLibraryReference(int libraryId) {
        return libraryRepository.getReferenceById(libraryId);
    }

    public Page<Library> getAllLibraries(int page, int size) {
        User user = SecurityUtils.getCurrentUser();
        PageRequest pageRequest = PageRequest.of(page, size, LIBRARY_SORT);
        return libraryRepository.findAllByOwner(user, pageRequest);
    }

    @Transactional
    public void scanManga(int libraryId) {
        Library library = getLibrary(libraryId);
        deleteInvalidManga(library);
        Path dir = Path.of(library.getPath());
        // check whether it is a valid directory
        assert Files.isDirectory(dir);
        List<Manga> mangaList = new ArrayList<>();
        scanMangaRecursive(mangaList, dir, library);
        mangaList = mangaList.stream().filter((manga) -> !mangaService.existsByPath(manga.getPath())).toList();
        mangaService.addAllManga(mangaList, libraryId);
    }

    private void scanMangaRecursive(List<Manga> mangaList, Path dir, Library library) {
        try (Stream<Path> paths = Files.list(dir)) {
            for (Path path : (Iterable<Path>) paths::iterator) {
                if (Files.isDirectory(path)) {
                    scanMangaRecursive(mangaList, path, library);
                } else if (MangaReader.SUPPORTED_FORMATS.contains(MoreFiles.getFileExtension(path))) {
                    mangaList.add(Manga.fromPath(path, library));
                }
            }
        } catch (IOException e) {
            throw new RuntimeIOException(e);
        }
    }

    private void deleteInvalidManga(Library library) {
        List<Manga> mangaList = library.getMangaList();
        for (Manga manga : mangaList) {
            Path mangaPath = Path.of(manga.getPath());
            if (!Files.exists(mangaPath)) {
                mangaService.deleteManga(manga.getId());
            }
        }
    }
}
