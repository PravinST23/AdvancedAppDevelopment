package com.britcertify.pravin.enumerated;

import lombok.RequiredArgsConstructor;
import lombok.Getter;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_CREATE("admin:create"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),

    USER_READ("admin:read"),
    USER_CREATE("admin:create"),
    USER_UPDATE("admin:update"),
    USER_DELETE("admin:delete");

    @Getter
    private final String Permission;
}