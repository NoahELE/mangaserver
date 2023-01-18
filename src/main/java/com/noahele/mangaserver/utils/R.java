package com.noahele.mangaserver.utils;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Util wrapper class for response
 *
 * @param code, 0 for ok and 1 for error
 * @param msg
 * @param data
 * @param <T>
 */
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public record R<T>(int code, String msg, T data) {
    public static <T> R<T> ok(T data) {
        return new R<>(0, null, data);
    }

    public static <T> R<T> ok() {
        return new R<>(0, null, null);
    }

    public static <T> R<T> err(String msg) {
        return new R<>(1, msg, null);
    }

    public static <T> R<T> err(Exception e) {
        return R.err(e.toString());
    }
}
