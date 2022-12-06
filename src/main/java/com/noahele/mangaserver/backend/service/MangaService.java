package com.noahele.mangaserver.backend.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.RemovalListener;
import com.google.common.io.Files;
import com.noahele.mangaserver.backend.entity.Library;
import com.noahele.mangaserver.backend.entity.Manga;
import com.noahele.mangaserver.backend.exception.UnsupportedFormatException;
import com.noahele.mangaserver.backend.repository.MangaRepository;
import com.noahele.mangaserver.backend.util.MangaReader;
import com.noahele.mangaserver.backend.util.ZipMangaReader;
import lombok.NonNull;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MangaService {
    private final MangaRepository repo;
    private static final int READER_CACHE_SIZE = 2;
    private final LoadingCache<String, MangaReader> readerCache = CacheBuilder.newBuilder()
            .initialCapacity(READER_CACHE_SIZE)
            .maximumSize(READER_CACHE_SIZE)
            .removalListener((RemovalListener<String, MangaReader>) notification -> {
                try {
                    MangaReader reader = notification.getValue();
                    assert reader != null;
                    reader.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            })
            .build(new CacheLoader<>() {
                @Override
                public @NonNull MangaReader load(@NonNull String path) throws Exception {
                    String ext = Files.getFileExtension(path);
                    return switch (ext) {
                        case "zip" -> new ZipMangaReader(path);
                        // TODO support more archive format
                        default -> throw new UnsupportedFormatException("unknown archive type: " + ext);
                    };
                }
            });

    public MangaService(MangaRepository repo) {
        this.repo = repo;
    }

    public void addManga(Manga manga) {
        repo.save(manga);
    }

    public void addAllManga(List<Manga> mangaList) {
        repo.saveAll(mangaList);
    }

    public void deleteManga(int id) {
        repo.deleteById(id);
    }

    public void updateManga(int id, Manga manga) {
        manga.setId(id);
        repo.save(manga);
    }

    public List<Manga> getAllMangasInLibrary(Library library) {
        return repo.findAllByLibrary(library);
    }

    public Manga getMangaById(int id) {
        return repo.findById(id).orElseThrow();
    }

    public List<String> getAllMangaPageNames(Manga manga) throws ExecutionException {
        return readerCache.get(manga.getPath()).getAllFileNames();
    }

    public byte[] getMangaPage(Manga manga, int pageIndex) throws ExecutionException {
        return readerCache.get(manga.getPath()).getPage(pageIndex);
    }

    public MediaType getMangaPageExt(Manga manga, int pageIndex) throws ExecutionException {
        String ext = Files.getFileExtension(readerCache.get(manga.getPath()).getAllFileNames().get(pageIndex));
        return switch (ext) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "png" -> MediaType.IMAGE_PNG;
            default -> throw new UnsupportedFormatException("unknown image type: " + ext);
        };
    }
}
