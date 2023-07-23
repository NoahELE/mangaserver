package com.noahele.mangaserver.domain.series;

import com.noahele.mangaserver.domain.library.Library;
import com.noahele.mangaserver.domain.library.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class SeriesService {
    private static final Sort SERIES_SORT = Sort.sort(Series.class).by(Series::getName).ascending();
    private final SeriesRepository seriesRepository;
    private final LibraryService libraryService;

    @Autowired
    public SeriesService(SeriesRepository seriesRepository, LibraryService libraryService) {
        this.seriesRepository = seriesRepository;
        this.libraryService = libraryService;
    }

    public Page<Series> getAllSeriesByLibrary(int libraryId, int page, int size) {
        Library library = libraryService.getLibrary(libraryId);
        PageRequest pageRequest = PageRequest.of(page, size, SERIES_SORT);
        return seriesRepository.findAllByLibrary(library, pageRequest);
    }

    public Series getSeries(int seriesId) {
        return seriesRepository.findById(seriesId).orElseThrow();
    }
}
