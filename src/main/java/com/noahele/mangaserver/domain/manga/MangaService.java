package com.noahele.mangaserver.domain.manga;

import com.noahele.mangaserver.cache.MangaPageCache;
import com.noahele.mangaserver.domain.library.Library;
import com.noahele.mangaserver.domain.library.LibraryService;
import com.noahele.mangaserver.domain.series.Series;
import com.noahele.mangaserver.domain.series.SeriesService;
import com.noahele.mangaserver.domain.user.User;
import com.noahele.mangaserver.exception.UserOwnershipException;
import com.noahele.mangaserver.security.SecurityUtils;
import com.noahele.mangaserver.utils.MangaPageInfo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MangaService {
    private static final Sort MANGA_SORT = Sort.sort(Manga.class).by(Manga::getName).ascending();
    private final MangaRepository mangaRepository;
    private final LibraryService libraryService;
    private final SeriesService seriesService;
    private final MangaPageCache mangaPageCache;

    public void addManga(Manga manga, int libraryId) {
        Library library = libraryService.getLibraryReference(libraryId);
        manga.setLibrary(library);
        assert manga.getId() == null;
        mangaRepository.save(manga);
    }

    public void addAllManga(List<Manga> mangaList, int libraryId) {
        Library library = libraryService.getLibraryReference(libraryId);
        mangaList.forEach(manga -> {
            assert manga.getId() == null;
            manga.setLibrary(library);
        });
        mangaRepository.saveAll(mangaList);
    }

    public void deleteManga(int mangaId) {
        mangaRepository.deleteById(mangaId);
    }

    public void updateManga(int mangaId, Manga manga) {
        assert manga.getId() == null;
        mangaRepository
                .findById(mangaId)
                .map(m -> {
                    manga.setId(m.getId());
                    return mangaRepository.save(manga);
                })
                .orElseThrow();
    }

    public Page<Manga> getAllMangaByLibrary(int libraryId, int page, int size) {
        Library library = libraryService.getLibraryReference(libraryId);
        PageRequest pageRequest = PageRequest.of(page, size, MANGA_SORT);
        return mangaRepository.findAllByLibrary(library, pageRequest);
    }

    public Page<Manga> getAllMangaBySeries(int seriesId, int page, int size) {
        Series series = seriesService.getSeriesReference(seriesId);
        PageRequest pageRequest = PageRequest.of(page, size, MANGA_SORT);
        return mangaRepository.findAllBySeriesListContaining(series, pageRequest);
    }

    public Manga getManga(int mangaId) {
        Manga manga = mangaRepository.findById(mangaId).orElseThrow();
        // throw OwnerNotMatchException if the user does not have access to the manga's library
        User user = SecurityUtils.getCurrentUser();
        if (user == null || !user.equals(manga.getLibrary().getOwner())) {
            throw new UserOwnershipException(user);
        }
        return manga;
    }

    public boolean existsByPath(String path) {
        return mangaRepository.existsByPath(path);
    }

    public MangaPageInfo getMangaPage(int mangaId, int pageIndex) {
        Manga manga = getManga(mangaId);
        return mangaPageCache.get(Path.of(manga.getPath()), pageIndex);
    }

    @SneakyThrows(IOException.class)
    @Transactional
    public void uploadManga(MultipartFile file, int libraryId) {
        Library library = libraryService.getLibraryReference(libraryId);
        String filename = file.getOriginalFilename();
        assert filename != null;
        Path path = Path.of(library.getPath(), filename);
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, path);
            Manga manga = Manga.fromPath(path, library);
            addManga(manga, libraryId);
        }
    }
}
