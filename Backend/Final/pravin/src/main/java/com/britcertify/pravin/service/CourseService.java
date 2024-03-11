package com.britcertify.pravin.service;

import com.britcertify.pravin.dto.request.CourseRequest;
import com.britcertify.pravin.dto.request.UpdateCourseRequest;
import com.britcertify.pravin.dto.response.CourseDeleteResponse;
import com.britcertify.pravin.dto.response.CourseGetResponse;
import com.britcertify.pravin.dto.response.CoursePostResponse;

import java.util.List;

public interface CourseService {

    CoursePostResponse saveCourse(CourseRequest request);
    List<CourseGetResponse> getAllCourses();
    CourseDeleteResponse deleteCourseByName(String courseName);
    CoursePostResponse updateCourse(String courseId, UpdateCourseRequest request);
    CourseGetResponse getCourseByName(String courseName);
}
