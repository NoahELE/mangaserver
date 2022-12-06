package com.noahele.mangaserver.backend.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.cache.RemovalListener;
import com.google.common.io.Files;
import com.noahele.mangaserver.backend.entity.Library;
import com.noahele.mangaserver.backend.entity.Manga;
import com.noahele.mangaserver.backend.repository.MangaRepository;
import com.noahele.mangaserver.backend.util.MangaReader;
import com.noahele.mangaserver.backend.util.ZipMangaReader;
import lombok.NonNull;
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
                    return switch (Files.getFileExtension(path)) {
                        case "zip" -> new ZipMangaReader(path);
                        default -> throw new RuntimeException("not implemented");
                    };
                }
            });

    public MangaService(MangaRepository repo) {
        this.repo = repo;
    }

    public List<Manga> getAllMangasInLibrary(Library library) {
        return repo.findAllByLibrary(library);
    }

    public Manga getMangaById(Integer id) {
        return repo.findById(id).orElseThrow();
    }

    public void addManga(Manga manga) {
        // check duplication
        if (repo.existsByPath(manga.getPath())) {
            throw new RuntimeException("manga with path %s already exists".formatted(manga.getPath()));
        }
        repo.save(manga);
    }

    public void deleteManga(Integer id) {
        repo.deleteById(id);
    }

    public List<String> getAllMangaImagesNames(Integer id) throws ExecutionException {
        Manga manga = getMangaById(id);
        return readerCache.get(manga.getPath()).getAllFileNames();
    }

    public byte[] getMangaPage(Integer id, int pageIndex) throws ExecutionException {
        Manga manga = getMangaById(id);
        return readerCache.get(manga.getPath()).getPage(pageIndex);
    }
}
