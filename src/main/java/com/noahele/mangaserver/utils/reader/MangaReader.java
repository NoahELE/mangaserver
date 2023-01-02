package com.noahele.mangaserver.utils.reader;

import java.io.Closeable;
import java.util.List;

public interface MangaReader extends Closeable {
    List<String> getAllFileNames();

    byte[] getPage(int pageIndex);
}
