package com.noahele.mangaserver.exception;

import com.noahele.mangaserver.domain.user.User;

public class UserOwnershipException extends BaseException {
    public UserOwnershipException(User user) {
        super("User " + user + " cannot perform this action");
    }
}
