package com.britcertify.pravin.service.impl;

import com.britcertify.pravin.dto.request.CourseRequest;
import com.britcertify.pravin.dto.request.UpdateCourseRequest;
import com.britcertify.pravin.dto.response.CourseDeleteResponse;
import com.britcertify.pravin.dto.response.CourseGetResponse;
import com.britcertify.pravin.dto.response.CoursePostResponse;
import com.britcertify.pravin.model.Course;
import com.britcertify.pravin.repository.CourseRepo;
import com.britcertify.pravin.service.CourseService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepo courseRepo;

    @Override
    public CoursePostResponse saveCourse(CourseRequest request) {
        try {
            Course course = Course.builder()
                    .courseName(request.getCourseName())
                    .duration(request.getDuration())
                    .fees(request.getFees())
                    .level(request.getLevel())
                    .image(request.getImage().getBytes()) // Convert MultipartFile to byte[]
                    .build();

            courseRepo.save(course);

            return CoursePostResponse.builder().message("Course saved successfully").build();
        } catch (IOException e) {
            e.printStackTrace();
            return CoursePostResponse.builder().message("Failed to save course: " + e.getMessage()).build();
        }
    }

    @Override
    public List<CourseGetResponse> getAllCourses() {
        List<Course> courses = courseRepo.findAll();
        return courses.stream()
                .map(this::mapToCourseGetResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CourseGetResponse getCourseByName(String courseName) {
        Course course = courseRepo.findByCourseName(courseName);
        if (course != null) {
            return mapToCourseGetResponse(course);
        } else {
            throw new IllegalArgumentException("Course not found with name: " + courseName);
        }
    }

    private CourseGetResponse mapToCourseGetResponse(Course course) {
        return CourseGetResponse.builder()
                .courseName(course.getCourseName())
                .duration(course.getDuration())
                .fees(course.getFees())
                .level(course.getLevel())
                .image(course.getImage()) // Assuming getImage() returns byte[] for the image
                .build();
    }

    @Override
    public CourseDeleteResponse deleteCourseByName(String courseName) {
        // Implement logic to delete course by name from repository and return CourseDeleteResponse
        throw new UnsupportedOperationException("Unimplemented method 'deleteCourseByName'");
    }

    @Override
    public CoursePostResponse updateCourse(String courseId, UpdateCourseRequest request) {
        // Implement logic to update course by ID with data from UpdateCourseRequest
        throw new UnsupportedOperationException("Unimplemented method 'updateCourse'");
    }
}
