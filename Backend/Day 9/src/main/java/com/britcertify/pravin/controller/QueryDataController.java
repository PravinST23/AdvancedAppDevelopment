package com.britcertify.pravin.controller;

import static com.britcertify.pravin.utils.MyConstant.AUTH;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.britcertify.pravin.dto.request.QueryDataRequest;
import com.britcertify.pravin.dto.response.QueryDataGetResponse;
import com.britcertify.pravin.dto.response.QueryDataPostResponse;
import com.britcertify.pravin.service.QueryDataService;
import java.util.List;

@RestController
@RequestMapping(AUTH)
public class QueryDataController {

    private final QueryDataService queryDataService;

    public QueryDataController(QueryDataService queryDataService) {
        this.queryDataService = queryDataService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/save/enquiry")
    public QueryDataPostResponse saveEnquiry(@RequestBody QueryDataRequest request) {
        return queryDataService.saveQuery(request);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get/all-enquiries")
    public List<QueryDataGetResponse> getAllEnquiries() {
         return queryDataService.getAllQueries();
    }
}
