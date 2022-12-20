package com.noahele.mangaserver.service;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.github.benmanes.caffeine.cache.RemovalListener;
import com.google.common.io.Files;
import com.noahele.mangaserver.entity.Library;
import com.noahele.mangaserver.entity.Manga;
import com.noahele.mangaserver.exception.UnsupportedFormatException;
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

    public MangaService(MangaRepository mangaRepository) {
        this.mangaRepository = mangaRepository;
    }

    public void addManga(Manga manga) {
        assert manga.getId() != null;
        mangaRepository.save(manga);
    }

    public void addAllManga(List<Manga> mangaList) {
        for (Manga manga : mangaList) {
            assert manga.getId() != null;
        }
        mangaRepository.saveAll(mangaList);
    }

    public void deleteManga(int id) {
        mangaRepository.deleteById(id);
    }

    public void updateManga(int id, Manga manga) {
        assert manga.getId() == null;
        manga.setId(id);
        mangaRepository.save(manga);
    }

    public Manga getManga(int id) {
        return mangaRepository.findById(id).orElseThrow();
    }

    public List<Manga> getAllMangasInLibrary(Library library) {
        return mangaRepository.findAllByLibrary(library);
    }

    public List<String> getAllMangaPageNames(Manga manga) {
        return readerCache.get(manga.getPath()).getAllFileNames();
    }

    public byte[] getMangaPage(Manga manga, int pageIndex) {
        return readerCache.get(manga.getPath()).getPage(pageIndex);
    }

    public MediaType getMangaPageExt(Manga manga, int pageIndex) {
        String ext = Files.getFileExtension(readerCache.get(manga.getPath()).getAllFileNames().get(pageIndex));
        return switch (ext) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "png" -> MediaType.IMAGE_PNG;
            default -> throw new UnsupportedFormatException("unknown image type: " + ext);
        };
    }
}
