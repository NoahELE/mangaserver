package com.noahele.mangaserver.utils.reader;

import com.google.common.io.Files;
import com.noahele.mangaserver.exception.UnsupportedFormatException;
import com.noahele.mangaserver.utils.MangaPageInfo;
import org.springframework.http.MediaType;

import java.io.Closeable;
import java.io.File;
import java.io.IOException;
import java.util.Set;

public abstract class MangaReader implements Closeable {
    public static final Set<String> SUPPORTED_FORMATS = Set.of("zip", "cbz", "7z", "cb7");

    public static MangaReader fromFile(File file) throws IOException {
        String ext = Files.getFileExtension(file.getName());
        return switch (ext) {
            case "zip", "cbz" -> new ZipMangaReader(file);
            case "7z", "cb7" -> new SevenZMangaReader(file);
            // TODO support more archive format
            default -> throw new UnsupportedFormatException(ext);
        };
    }

    protected static MediaType getPageMediaType(String filename) {
        String ext = Files.getFileExtension(filename).toLowerCase();
        return switch (ext) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "png" -> MediaType.IMAGE_PNG;
            case "gif" -> MediaType.IMAGE_GIF;
            default -> throw new UnsupportedFormatException(ext);
        };
    }

    public abstract int getNumOfPages();

    public abstract MangaPageInfo getPage(int pageIndex) throws IOException;
}
