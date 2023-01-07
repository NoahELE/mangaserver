package com.noahele.mangaserver.service;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.github.benmanes.caffeine.cache.RemovalListener;
import com.google.common.io.Files;
import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.entity.User;
import com.noahele.mangaserver.exception.OwnerNotMatchException;
import com.noahele.mangaserver.exception.UnsupportedFormatException;
import com.noahele.mangaserver.repository.MangaRepository;
import com.noahele.mangaserver.utils.CurrUserFacade;
import com.noahele.mangaserver.utils.reader.MangaReader;
import com.noahele.mangaserver.utils.reader.ZipMangaReader;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MangaService {
    private static final int READER_CACHE_SIZE = 4;
    private final LoadingCache<String, MangaReader> readerCache = Caffeine.newBuilder()
            .initialCapacity(READER_CACHE_SIZE)
            .maximumSize(READER_CACHE_SIZE)
            .removalListener((RemovalListener<String, MangaReader>) (key, value, cause) -> {
                try {
                    assert value != null;
                    value.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            })
            .build(path -> {
                String ext = Files.getFileExtension(path);
                return switch (ext) {
                    case "zip", "cbz" -> new ZipMangaReader(path);
                    // TODO support more archive format
                    default -> throw new UnsupportedFormatException("unknown archive type: " + ext);
                };
            });
    private final MangaRepository mangaRepository;
    private final LibraryService libraryService;

    public MangaService(MangaRepository mangaRepository, @Lazy LibraryService libraryService) {
        this.mangaRepository = mangaRepository;
        this.libraryService = libraryService;
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

    public Manga getManga(int id) throws OwnerNotMatchException {
        Manga manga = mangaRepository.findById(id).orElseThrow();
        // throw OwnerNotMatchException if the user does not have access to the manga's library
        User user = CurrUserFacade.getUser();
        if (!user.equals(manga.getLibrary().getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        // update num of pages if it is null
        if (manga.getNumOfPages() == null) {
            int numOfPages = readerCache.get(manga.getPath()).getAllFileNames().size();
            manga.setNumOfPages(numOfPages);
            mangaRepository.save(manga);
        }
        return manga;
    }

    public List<String> getAllMangaPageNames(int id) throws OwnerNotMatchException {
        Manga manga = getManga(id);
        return readerCache.get(manga.getPath()).getAllFileNames();
    }

    public byte[] getMangaPage(int id, int pageIndex) throws OwnerNotMatchException {
        Manga manga = getManga(id);
        MangaReader mangaReader = readerCache.get(manga.getPath());
        return mangaReader.getPage(pageIndex);
    }

    public MediaType getMangaPageExt(int id, int pageIndex) throws OwnerNotMatchException {
        Manga manga = getManga(id);
        String ext = Files.getFileExtension(readerCache.get(manga.getPath()).getAllFileNames().get(pageIndex));
        return switch (ext) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "png" -> MediaType.IMAGE_PNG;
            default -> throw new UnsupportedFormatException("unknown image type: " + ext);
        };
    }
}
