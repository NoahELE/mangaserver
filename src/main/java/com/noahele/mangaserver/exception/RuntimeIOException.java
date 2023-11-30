package com.noahele.mangaserver.exception;

import java.io.IOException;

public class RuntimeIOException extends BaseException {
    public RuntimeIOException(IOException ioException) {
        super(ioException);
    }
}
