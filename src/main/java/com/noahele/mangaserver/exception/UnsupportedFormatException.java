package com.noahele.mangaserver.exception;

public class UnsupportedFormatException extends BaseException {
  public UnsupportedFormatException(String ext) {
    super("Unknown format: " + ext);
  }
}
