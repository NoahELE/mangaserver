package com.noahele.mangaserver.exception;

public class UnsupportedFormatException extends RuntimeException {
    public UnsupportedFormatException(String ext) {
        super("Unknown format: " + ext);
    }
}
