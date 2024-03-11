package com.britcertify.pravin.service;

import java.io.IOException;

import com.britcertify.pravin.dto.request.LoginRequest;
import com.britcertify.pravin.dto.request.RegisterRequest;
import com.britcertify.pravin.dto.response.LoginResponse;
import com.britcertify.pravin.dto.response.RegisterResponse;
import com.britcertify.pravin.dto.response.UserDetailsResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {
    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    boolean emailExists(String email);
    boolean mobileNumberExists(String mobileNumber);

    UserDetailsResponse getUserDetailsByEmail(String email);

    RegisterResponse updateUserDetails(RegisterRequest request);}
