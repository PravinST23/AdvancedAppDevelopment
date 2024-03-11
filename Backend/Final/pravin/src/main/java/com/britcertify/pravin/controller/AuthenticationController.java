package com.britcertify.pravin.controller;

import static com.britcertify.pravin.utils.MyConstant.AUTH;
import static com.britcertify.pravin.utils.MyConstant.LOGIN;
import static com.britcertify.pravin.utils.MyConstant.REFRESR_TOKEN;
import static com.britcertify.pravin.utils.MyConstant.REGISTER;
import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.EXPECTATION_FAILED;

import java.io.IOException;
// import java.security.Principal;

// import org.springframework.boot.actuate.web.exchanges.HttpExchange.Principal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.britcertify.pravin.dto.request.LoginRequest;
import com.britcertify.pravin.dto.request.RegisterRequest;
import com.britcertify.pravin.dto.response.LoginResponse;
import com.britcertify.pravin.dto.response.RegisterResponse;
import com.britcertify.pravin.dto.response.UserDetailsResponse;
import com.britcertify.pravin.service.AuthenticationService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AUTH)
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    // @PostMapping(REGISTER)
    // public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
    //     RegisterResponse response = new RegisterResponse();
    //     try {
    //         response = authService.register(request);
    //         return new ResponseEntity<>(response, ACCEPTED);
    //     } catch (Exception e) {
    //         response.setMessage("Registration failed due to an unexpected error.");
    //         return new ResponseEntity<>(response, EXPECTATION_FAILED);
    //     }
    // }


    @PostMapping(REGISTER)
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        RegisterResponse response = new RegisterResponse();
        try {
            boolean emailExists = authService.emailExists(request.getEmail());
            boolean mobileExists = authService.mobileNumberExists(request.getMobilenumber());

            // Check if email already exists
            if (emailExists) {
                response.setMessage("Email already exists");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Check if mobile number already exists
            if (mobileExists) {
                response.setMessage("Mobile number already exists");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            response = authService.register(request);
            return new ResponseEntity<>(response, ACCEPTED);
        } catch (Exception e) {
            response.setMessage("Registration failed due to an unexpected error.");
            return new ResponseEntity<>(response, EXPECTATION_FAILED);
        }
    }

    @PostMapping(LOGIN)
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = new LoginResponse();
        try {
            response = authService.login(request);
            return new ResponseEntity<>(response, ACCEPTED);
        } catch (Exception e) {
            response.setMessage("Login failed!");
            response.setAccessToken("");
            return new ResponseEntity<>(response, EXPECTATION_FAILED);
        }
    }

    @PostMapping(REFRESR_TOKEN)
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        authService.refreshToken(request, response);
    }
    @GetMapping("/api/v1/auth/user-details")
    public ResponseEntity<UserDetailsResponse> getUserDetailsByEmail(@RequestParam String email) {
        UserDetailsResponse userDetails = authService.getUserDetailsByEmail(email);
        return new ResponseEntity<>(userDetails, HttpStatus.OK);
    }

    @PutMapping("/api/v1/auth/update-user-details")
    public ResponseEntity<RegisterResponse> updateUserDetails(@RequestBody RegisterRequest request) {
        RegisterResponse response = new RegisterResponse();
        try {
            response = authService.updateUserDetails(request);
            return new ResponseEntity<>(response, ACCEPTED);
        } catch (Exception e) {
            response.setMessage("Failed to update user details due to an unexpected error.");
            return new ResponseEntity<>(response, EXPECTATION_FAILED);
        }
    }
}


