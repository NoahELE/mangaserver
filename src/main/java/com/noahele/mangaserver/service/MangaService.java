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
import com.noahele.mangaserver.repository.LibraryRepository;
import com.noahele.mangaserver.repository.MangaRepository;
import com.noahele.mangaserver.util.reader.MangaReader;
import com.noahele.mangaserver.util.reader.ZipMangaReader;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MangaService {
    private final MangaRepository mangaRepository;
    private static final int READER_CACHE_SIZE = 2;
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
    private final LibraryRepository libraryRepository;

    public MangaService(MangaRepository mangaRepository,
                        LibraryRepository libraryRepository) {
        this.mangaRepository = mangaRepository;
        this.libraryRepository = libraryRepository;
    }

    public void addManga(Manga manga,
                         int libraryId,
                         User user) throws OwnerNotMatchException {
        assert manga.getId() != null;
        // check if user owns the library
        Library library = libraryRepository.findById(libraryId).orElseThrow();
        if (!user.equals(library.getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        manga.setLibrary(library);
        mangaRepository.save(manga);
    }

    public void addAllManga(List<Manga> mangaList,
                            int libraryId,
                            User user) throws OwnerNotMatchException {
        // check if user owns the library
        Library library = libraryRepository.findById(libraryId).orElseThrow();
        if (!user.equals(library.getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        for (Manga manga : mangaList) {
            assert manga.getId() != null;
            manga.setLibrary(library);
        }
        mangaRepository.saveAll(mangaList);
    }

    public void deleteManga(int id, User user) throws OwnerNotMatchException {
        Manga manga = mangaRepository.findById(id).orElseThrow();
        if (!user.equals(manga.getLibrary().getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        mangaRepository.deleteById(id);
    }

    public void updateManga(int id, Manga manga, User user) throws OwnerNotMatchException {
        Manga m = mangaRepository.findById(id).orElseThrow();
        if (!user.equals(m.getLibrary().getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        assert manga.getId() == null;
        manga.setId(id);
        mangaRepository.save(manga);
    }

    public Manga getManga(int id, User user) throws OwnerNotMatchException {
        Manga manga = mangaRepository.findById(id).orElseThrow();
        if (!user.equals(manga.getLibrary().getOwner())) {
            throw new OwnerNotMatchException(user);
        }
        return mangaRepository.findById(id).orElseThrow();
    }

    public List<String> getAllMangaPageNames(int id, User user) throws OwnerNotMatchException {
        Manga manga = getManga(id, user);
        return readerCache.get(manga.getPath()).getAllFileNames();
    }

    public byte[] getMangaPage(int id, int pageIndex, User user) throws OwnerNotMatchException {
        Manga manga = getManga(id, user);
        return readerCache.get(manga.getPath()).getPage(pageIndex);
    }

    public MediaType getMangaPageExt(int id, int pageIndex, User user) throws OwnerNotMatchException {
        Manga manga = getManga(id, user);
        String ext = Files.getFileExtension(readerCache.get(manga.getPath()).getAllFileNames().get(pageIndex));
        return switch (ext) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "png" -> MediaType.IMAGE_PNG;
            default -> throw new UnsupportedFormatException("unknown image type: " + ext);
        };
    }
}
