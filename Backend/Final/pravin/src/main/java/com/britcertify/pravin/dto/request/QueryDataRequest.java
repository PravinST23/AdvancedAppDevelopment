package com.britcertify.pravin.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QueryDataRequest {

    private String id;

    private String courseName;

    private String email;

    private String enquiryType;

    private String message;

    private String reply;

}