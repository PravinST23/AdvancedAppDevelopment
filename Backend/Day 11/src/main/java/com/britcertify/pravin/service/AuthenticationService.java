package com.britcertify.pravin.service;

import java.io.IOException;

import com.britcertify.pravin.dto.request.LoginRequest;
import com.britcertify.pravin.dto.request.RegisterRequest;
import com.britcertify.pravin.dto.response.LoginResponse;
import com.britcertify.pravin.dto.response.RegisterResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {
    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
