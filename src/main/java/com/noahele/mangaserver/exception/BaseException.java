package com.noahele.mangaserver.exception;

public class BaseException extends RuntimeException {
  public BaseException(String message) {
    super(message);
  }

  public BaseException(Exception exception) {
    super(exception);
  }
}
