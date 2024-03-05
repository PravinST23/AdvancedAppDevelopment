package com.britcertify.pravin.dto.request;

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

    private String level;

    private String imageFilePath; // Change from byte[] to String to store file path
}
