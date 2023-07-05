package com.noahele.mangaserver.exception;

import com.noahele.mangaserver.entity.User;

public class OwnerNotMatchException extends BaseException {
    public OwnerNotMatchException(User user) {
        super("User " + user + " cannot perform this action");
    }
}
