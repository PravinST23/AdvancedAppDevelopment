package com.britcertify.pravin.dto.request;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseRequest {

    private String courseName;
    private String duration;
    private String fees;
    private String level;
    private MultipartFile image; // Change type to MultipartFile for image file upload

}
