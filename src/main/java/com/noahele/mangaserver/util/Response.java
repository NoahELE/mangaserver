package com.noahele.mangaserver.util;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public record Response<T>(Type type, String msg, T data) {
    public enum Type {
        OK, ERR
    }

    public static <T> Response<T> ok(T data) {
        return new Response<>(Type.OK, null, data);
    }

    public static <T> Response<T> ok() {
        return new Response<>(Type.OK, null, null);
    }

    public static <T> Response<T> err(String msg) {
        return new Response<>(Type.ERR, msg, null);
    }

    public static <T> Response<T> err(Exception e) {
        return new Response<>(Type.ERR, e.toString(), null);
    }
}
