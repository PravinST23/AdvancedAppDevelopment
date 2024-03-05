package com.britcertify.pravin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseGetResponse {

    private String courseName;
    private String duration;
    private String level;
    private String message;
}
