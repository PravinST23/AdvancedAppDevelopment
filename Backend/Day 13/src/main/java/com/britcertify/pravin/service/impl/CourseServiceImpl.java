package com.britcertify.pravin.service.impl;

import org.springframework.stereotype.Service;

import com.britcertify.pravin.dto.request.CourseRequest;
import com.britcertify.pravin.dto.response.CourseGetResponse;
import com.britcertify.pravin.dto.response.CoursePostResponse;
import com.britcertify.pravin.model.Course;
import com.britcertify.pravin.repository.CourseRepo;
import com.britcertify.pravin.service.CourseService;

import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepo courseRepo;

    @SuppressWarnings("null")
    @Override
    public CoursePostResponse saveCourse(CourseRequest request) {
        try {
            // Read image file as bytes
            byte[] imageData = readImageFromFile(request.getImageFilePath());

            Course course = Course.builder()
                                .courseName(request.getCourseName())
                                .duration(request.getDuration())
                                .level(request.getLevel())
                                .image(imageData) // Set image bytes directly
                                .build();
            
            courseRepo.save(course);

            return CoursePostResponse.builder().message("Course saved successfully").build();
        } catch (Exception e) {
            e.printStackTrace(); // Handle the exception properly
            return CoursePostResponse.builder().message("Failed to save course").build();
        }
    }

    private byte[] readImageFromFile(String filePath) throws IOException {
        File file = new File(filePath);
        byte[] imageData = new byte[(int) file.length()];
        try (FileInputStream fis = new FileInputStream(file)) {
            fis.read(imageData);
        }
        return imageData;
    }

    @Override
public List<CourseGetResponse> getAllCourses() {
    List<Course> courses = courseRepo.findAll();
    return courses.stream()
                  .map((Course course) -> CourseGetResponse.builder()
                                              .message("Course retrieved successfully")
                                              .courseName(course.getCourseName())
                                              .duration(course.getDuration())
                                              .level(course.getLevel())
                                              .build())
                  .collect(Collectors.toList());
}

}
