package com.britcertify.pravin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QueryDataGetResponse {

    private String courseName;
    private String email;
    private String enquiryType;
    private String message;
}
