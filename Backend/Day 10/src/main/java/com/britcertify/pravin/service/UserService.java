package com.britcertify.pravin.service;

import java.security.Principal;

import com.britcertify.pravin.dto.request.PasswordRequest;

public interface UserService {

    void forgotPassword(PasswordRequest request, Principal principal);

}
