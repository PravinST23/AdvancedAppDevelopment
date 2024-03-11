package com.britcertify.pravin.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.britcertify.pravin.dto.request.QueryDataRequest;
import com.britcertify.pravin.dto.response.QueryDataGetResponse;
import com.britcertify.pravin.dto.response.QueryDataPostResponse;
import com.britcertify.pravin.service.QueryDataService;
import java.util.List;

@RestController
@RequestMapping("/api/v1/query")
public class QueryDataController {

    private final QueryDataService queryDataService;

    public QueryDataController(QueryDataService queryDataService) {
        this.queryDataService = queryDataService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/save/enquiry")
    public QueryDataPostResponse saveEnquiry(@RequestBody QueryDataRequest request) {
        return queryDataService.saveQuery(request);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/get/all-enquiries")
    public List<QueryDataGetResponse> getAllEnquiries() {
        return queryDataService.getAllQueries();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public QueryDataPostResponse updateQuery(@PathVariable String id, @RequestBody String reply) {
        return queryDataService.updateQuery(id, reply);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get/by-email/{email}")
    @PreAuthorize("hasRole('USER')")
    public List<QueryDataGetResponse> getQueriesByEmail(@PathVariable String email) {
        return queryDataService.getQueriesByEmail(email);
    }
}
