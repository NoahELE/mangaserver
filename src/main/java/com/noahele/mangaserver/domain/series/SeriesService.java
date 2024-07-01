package com.noahele.mangaserver.domain.series;

import com.noahele.mangaserver.domain.library.Library;
import com.noahele.mangaserver.domain.library.LibraryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SeriesService {
    private final SeriesRepository seriesRepository;
    private LibraryService libraryService;

    @Autowired
    public void setLibraryService(@Lazy LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    public Page<Series> getAllSeriesByLibrary(int libraryId, int page, int size) {
        Library library = libraryService.getLibraryReference(libraryId);
        Sort sort = Sort.sort(Series.class).by(Series::getName).ascending();
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return seriesRepository.findAllByLibrary(library, pageRequest);
    }

    public Series getSeries(int seriesId) {
        return seriesRepository.findById(seriesId).orElseThrow();
    }

    public Series getSeriesReference(int seriesId) {
        return seriesRepository.getReferenceById(seriesId);
    }
}
