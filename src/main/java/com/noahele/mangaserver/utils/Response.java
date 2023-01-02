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
public record Response<T>(int code, String msg, T data) {
    public static <T> Response<T> ok(T data) {
        return new Response<>(0, null, data);
    }

    public static <T> Response<T> ok() {
        return new Response<>(0, null, null);
    }

    public static <T> Response<T> err(String msg) {
        return new Response<>(1, msg, null);
    }

    public static <T> Response<T> err(Exception e) {
        return new Response<>(1, e.toString(), null);
    }
}
