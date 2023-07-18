package com.noahele.mangaserver.utils.reader;

import com.google.common.io.Files;
import com.noahele.mangaserver.exception.UnsupportedFormatException;
import com.noahele.mangaserver.utils.MangaPageInfo;

import java.io.Closeable;
import java.io.IOException;
import java.util.Set;

public abstract class MangaReader implements Closeable {
    public static final Set<String> SUPPORTED_FORMATS = Set.of("zip", "cbz");

    public static MangaReader getByPath(String path) throws IOException {
        String ext = Files.getFileExtension(path);
        return switch (ext) {
            case "zip", "cbz" -> new ZipMangaReader(path);
            // TODO support more archive format
            default -> throw new UnsupportedFormatException(ext);
        };
    }

    public abstract int getNumOfPages();

    public abstract MangaPageInfo getPage(int pageIndex) throws IOException;
}
