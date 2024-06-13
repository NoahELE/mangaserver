package com.noahele.mangaserver.utils.reader;

import com.google.common.collect.Streams;
import com.noahele.mangaserver.utils.MangaPageInfo;
import com.noahele.mangaserver.utils.NaturalOrder;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.List;
import lombok.SneakyThrows;
import org.apache.commons.compress.archivers.sevenz.SevenZArchiveEntry;
import org.apache.commons.compress.archivers.sevenz.SevenZFile;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.http.MediaType;

public class SevenZMangaReader implements MangaReader {
  private final SevenZFile sevenZFile;
  private final List<SevenZArchiveEntry> entries;

  @SneakyThrows(IOException.class)
  public SevenZMangaReader(Path path) {
    this.sevenZFile = SevenZFile.builder().setFile(path.toFile()).get();
    Iterable<SevenZArchiveEntry> entries = sevenZFile.getEntries();
    this.entries =
        Streams.stream(entries)
            // remove directory entry
            .filter((entry) -> !entry.isDirectory())
            // sort entries by name with natural order
            .sorted((e1, e2) -> NaturalOrder.compare(e1.getName(), e2.getName()))
            .toList();
  }

  @Override
  public int getNumOfPages() {
    return entries.size();
  }

  @SneakyThrows(IOException.class)
  @Override
  public MangaPageInfo getPage(int pageIndex) {
    SevenZArchiveEntry entry = entries.get(pageIndex);
    MediaType mediaType = MangaReader.getPageMediaType(entry.getName());
    try (InputStream input = sevenZFile.getInputStream(entry)) {
      return new MangaPageInfo(IOUtils.toByteArray(input), mediaType);
    }
  }

  @Override
  public void close() throws IOException {
    sevenZFile.close();
  }
}
