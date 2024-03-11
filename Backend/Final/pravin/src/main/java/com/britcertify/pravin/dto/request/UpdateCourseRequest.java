package com.britcertify.pravin.dto.request;

import lombok.Data;

@Data
public class UpdateCourseRequest {
    private String courseName;
    private String duration;
    private String level;
    private String imageFilePath;
}
