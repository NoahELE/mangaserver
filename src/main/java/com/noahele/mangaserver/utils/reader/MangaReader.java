package com.noahele.mangaserver.utils.reader;

import com.google.common.io.Files;
import com.google.common.io.MoreFiles;
import com.noahele.mangaserver.exception.UnsupportedFormatException;
import com.noahele.mangaserver.utils.MangaPageInfo;
import org.springframework.http.MediaType;

import java.io.Closeable;
import java.nio.file.Path;
import java.util.Set;

public interface MangaReader extends Closeable {
    Set<String> SUPPORTED_FORMATS = Set.of("zip", "cbz", "7z", "cb7");

    static MangaReader fromPath(Path path) {
        String ext = MoreFiles.getFileExtension(path);
        return switch (ext) {
            case "zip", "cbz" -> new ZipMangaReader(path);
            case "7z", "cb7" -> new SevenZMangaReader(path);
            // TODO support more archive format
            default -> throw new UnsupportedFormatException(ext);
        };
    }

    static MediaType getPageMediaType(String filename) {
        String ext = Files.getFileExtension(filename).toLowerCase();
        return switch (ext) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "png" -> MediaType.IMAGE_PNG;
            case "gif" -> MediaType.IMAGE_GIF;
            case "webp" -> new MediaType("image", "webp");
            default -> throw new UnsupportedFormatException(ext);
        };
    }

    int getNumOfPages();

    MangaPageInfo getPage(int pageIndex);
}
