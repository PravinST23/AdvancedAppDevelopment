package com.britcertify.pravin.controller;

import static com.britcertify.pravin.utils.MyConstant.AUTH;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.britcertify.pravin.dto.request.CourseRequest;
import com.britcertify.pravin.dto.response.CourseGetResponse;
import com.britcertify.pravin.dto.response.CoursePostResponse;
import com.britcertify.pravin.service.CourseService;

@RestController
@RequestMapping(AUTH)
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/save/course")
    public CoursePostResponse saveCourse(@RequestBody CourseRequest request) {
        return courseService.saveCourse(request);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get/all")
    public List<CourseGetResponse> getAllCourses() {
        return courseService.getAllCourses();
    }
}
