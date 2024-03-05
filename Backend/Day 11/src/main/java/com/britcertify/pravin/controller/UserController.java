package com.britcertify.pravin.controller;

import static com.britcertify.pravin.utils.MyConstant.FORGOT_PASSWORD;
import static com.britcertify.pravin.utils.MyConstant.USER;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.britcertify.pravin.dto.request.PasswordRequest;
import com.britcertify.pravin.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(USER)
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")

@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('user:read', 'admin:read')")
    public String get() {
        return "GET:: user controller";
    }

    @PatchMapping(FORGOT_PASSWORD)
    @PreAuthorize("hasAnyAuthority('user:update', 'admin:update')")

    public ResponseEntity<?> forgotPassword(PasswordRequest request, Principal principal) {
        userService.forgotPassword(request, principal);
        return ResponseEntity.ok().body("Password changed successfully");
    }
}
