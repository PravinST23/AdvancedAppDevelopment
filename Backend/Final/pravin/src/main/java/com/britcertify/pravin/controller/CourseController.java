package com.britcertify.pravin.controller;

import com.britcertify.pravin.dto.request.CourseRequest;
import com.britcertify.pravin.dto.request.UpdateCourseRequest;
import com.britcertify.pravin.dto.response.CourseDeleteResponse;
import com.britcertify.pravin.dto.response.CourseGetResponse;
import com.britcertify.pravin.dto.response.CoursePostResponse;
import com.britcertify.pravin.service.CourseService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/course")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/save/courses")
    public CoursePostResponse saveCourse(@RequestParam("courseName") String courseName,
                                         @RequestParam("duration") String duration,
                                         @RequestParam("fees") String fees,
                                         @RequestParam("level") String level,
                                         @RequestParam("image") MultipartFile image) {
        CourseRequest request = CourseRequest.builder()
                .courseName(courseName)
                .duration(duration)
                .fees(fees)
                .level(level)
                .image(image)
                .build();
        return courseService.saveCourse(request);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<CourseGetResponse>> getAllCourses() {
        List<CourseGetResponse> courses = courseService.getAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping("/get/{courseName}")
    public ResponseEntity<CourseGetResponse> getCourseByName(@PathVariable String courseName) {
        CourseGetResponse course = courseService.getCourseByName(courseName);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

        
    @DeleteMapping("/delete/{courseName}")
    public CourseDeleteResponse deleteCourseByName(@PathVariable String courseName) {
        return courseService.deleteCourseByName(courseName);
    }

    @PatchMapping("/update/{courseName}") // Change PutMapping to PatchMapping
    public CoursePostResponse updateCourse(@PathVariable String courseName, @RequestBody UpdateCourseRequest request) {
        return courseService.updateCourse(courseName, request);
    }
}
