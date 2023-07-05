package com.noahele.mangaserver.exception;

import java.io.IOException;

public class CustomIOException extends BaseException {
    public CustomIOException(IOException ioException) {
        super(ioException.getMessage());
    }
}
