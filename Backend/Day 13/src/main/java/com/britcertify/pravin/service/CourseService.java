package com.britcertify.pravin.service;

import java.util.List;

import com.britcertify.pravin.dto.request.CourseRequest;
import com.britcertify.pravin.dto.response.CourseGetResponse;
import com.britcertify.pravin.dto.response.CoursePostResponse;

public interface CourseService {
    
    CoursePostResponse saveCourse(CourseRequest request);
    List<CourseGetResponse> getAllCourses();
}
