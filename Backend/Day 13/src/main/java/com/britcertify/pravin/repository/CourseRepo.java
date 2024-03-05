package com.britcertify.pravin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.britcertify.pravin.dto.request.CourseRequest;
import com.britcertify.pravin.model.Course;

public interface CourseRepo extends JpaRepository<Course, String> {
    void save(CourseRequest enquiry);
}
