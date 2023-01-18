package com.noahele.mangaserver.utils.reader;

import com.google.common.io.Files;
import com.noahele.mangaserver.exception.UnsupportedFormatException;
import com.noahele.mangaserver.utils.MangaPage;

import java.io.Closeable;
import java.io.IOException;

public abstract class MangaReader implements Closeable {
    public static MangaReader getByPath(String path) throws IOException {
        String ext = Files.getFileExtension(path);
        return switch (ext) {
            case "zip", "cbz" -> new ZipMangaReader(path);
            // TODO support more archive format
            default -> throw new UnsupportedFormatException("unknown archive type: " + ext);
        };
    }

    public abstract int getNumOfPages();

    public abstract MangaPage getPage(int pageIndex) throws IOException;
}
