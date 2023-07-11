package com.noahele.mangaserver.service;

import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.exception.OwnerNotMatchException;
import com.noahele.mangaserver.repository.MangaRepository;
import com.noahele.mangaserver.utils.CurrUserFacade;
import com.noahele.mangaserver.utils.MangaPageInfo;
import com.noahele.mangaserver.utils.cache.MangaPageCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MangaService {
    private static final Sort MANGA_SORT = Sort.sort(Manga.class).by(Manga::getName).ascending();
    private final MangaRepository mangaRepository;
    private final LibraryService libraryService;
    private final MangaPageCache mangaPageCache;

    @Autowired
    public MangaService(MangaRepository mangaRepository, @Lazy LibraryService libraryService, MangaPageCache mangaPageCache) {
        this.mangaRepository = mangaRepository;
        this.libraryService = libraryService;
        this.mangaPageCache = mangaPageCache;
    }

    public void addManga(Manga manga, int libraryId) throws OwnerNotMatchException {
        assert manga.getId() == null;
        Library library = libraryService.getLibrary(libraryId);
        manga.setLibrary(library);
        mangaRepository.save(manga);
    }

    public void addAllManga(List<Manga> mangaList, int libraryId) throws OwnerNotMatchException {
        Library library = libraryService.getLibrary(libraryId);
        for (Manga manga : mangaList) {
            assert manga.getId() == null;
            manga.setLibrary(library);
        }
        mangaRepository.saveAll(mangaList);
    }

    public void deleteManga(int id) throws OwnerNotMatchException {
        getManga(id); // check if the user can access the manga
        mangaRepository.deleteById(id);
    }

    public void updateManga(int id, Manga manga) throws OwnerNotMatchException {
        getManga(id); // check if the user can access the manga
        assert manga.getId() == null;
        manga.setId(id);
        mangaRepository.save(manga);
    }

    public Page<Manga> getAllByLibrary(int libraryId, int page, int size) throws OwnerNotMatchException {
        Library library = libraryService.getLibrary(libraryId);
        PageRequest pageRequest = PageRequest.of(page, size, MANGA_SORT);
        return mangaRepository.findAllByLibrary(library, pageRequest);
    }

    public Manga getManga(int id) throws OwnerNotMatchException {
        Manga manga = mangaRepository.findById(id).orElseThrow();
        // throw OwnerNotMatchException if the user does not have access to the manga's library
        User user = CurrUserFacade.getUser();
        if (user == null || !user.equals(manga.getLibrary().getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        return manga;
    }

    public boolean existsByPath(String path) {
        return mangaRepository.existsByPath(path);
    }

    public MangaPageInfo getMangaPage(int id, int pageIndex) throws OwnerNotMatchException {
        Manga manga = getManga(id);
        return mangaPageCache.get(manga.getPath(), pageIndex);
    }
}
