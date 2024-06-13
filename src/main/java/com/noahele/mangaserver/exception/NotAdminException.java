package com.noahele.mangaserver.exception;

public class NotAdminException extends BaseException {
  public NotAdminException() {
    super("The current use is not admin");
  }
}
