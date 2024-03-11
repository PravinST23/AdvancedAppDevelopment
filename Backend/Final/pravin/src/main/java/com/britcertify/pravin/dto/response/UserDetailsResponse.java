package com.britcertify.pravin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UserDetailsResponse {
    private String name;
    private String email;
    private String mobilenumber;
    private String age;
    private String address;
    private String state;
    private String city;
    private String postalcode;
    private String skills;
    private String role;
}
