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
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MangaService {
    private static final Sort MANGA_SORT = Sort.sort(Manga.class).by(Manga::getName).ascending();
    private final MangaRepository mangaRepository;
    private final LibraryService libraryService;
    private final SeriesService seriesService;
    private final MangaPageCache mangaPageCache;

    @Transactional
    public void addManga(Manga manga, int libraryId) {
        assert manga.getId() == null;
        Library library = libraryService.getLibrary(libraryId);
        manga.setLibrary(library);
        mangaRepository.save(manga);
    }

    @Transactional
    public void addAllManga(List<Manga> mangaList, int libraryId) {
        Library library = libraryService.getLibrary(libraryId);
        for (Manga manga : mangaList) {
            assert manga.getId() == null;
            manga.setLibrary(library);
        }
        mangaRepository.saveAll(mangaList);
    }

    @Transactional
    public void deleteManga(int mangaId) {
        getManga(mangaId); // check if the user can access the manga
        mangaRepository.deleteById(mangaId);
    }

    @Transactional
    public void updateManga(int mangaId, Manga manga) {
        getManga(mangaId); // check if the user can access the manga
        assert manga.getId() == null;
        manga.setId(mangaId);
        mangaRepository.save(manga);
    }

    @Transactional
    public Page<Manga> getAllMangaByLibrary(int libraryId, int page, int size) {
        Library library = libraryService.getLibrary(libraryId);
        PageRequest pageRequest = PageRequest.of(page, size, MANGA_SORT);
        return mangaRepository.findAllByLibrary(library, pageRequest);
    }

    @Transactional
    public Page<Manga> getAllMangaBySeries(int seriesId, int page, int size) {
        Series series = seriesService.getSeries(seriesId);
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
        return mangaPageCache.get(new File(manga.getPath()), pageIndex);
    }
}
