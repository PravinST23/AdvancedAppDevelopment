package com.britcertify.pravin.service.impl;

import org.springframework.stereotype.Service;

import com.britcertify.pravin.dto.request.QueryDataRequest;
import com.britcertify.pravin.dto.response.QueryDataGetResponse;
import com.britcertify.pravin.dto.response.QueryDataPostResponse;
import com.britcertify.pravin.model.QueryData;
import com.britcertify.pravin.repository.QueryDataRepo;
import com.britcertify.pravin.service.QueryDataService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QueryDataImpl implements QueryDataService {

    private final QueryDataRepo repo;

    @SuppressWarnings("null")
    @Override
    public QueryDataPostResponse saveQuery(QueryDataRequest request) {
        var query = QueryData.builder()
                .courseName(request.getCourseName())
                .email(request.getEmail())
                .enquiryType(request.getEnquiryType())
                .message(request.getMessage())
                .reply(request.getReply())
                .build();
        repo.save(query);
        return QueryDataPostResponse.builder().message("saved").build();
    }

    @Override
    public List<QueryDataGetResponse> getAllQueries() {
        List<QueryData> queries = repo.findAll();
        return queries.stream()
                      .map(query -> QueryDataGetResponse.builder()
                                                  .id(query.getId())
                                                  .courseName(query.getCourseName())
                                                  .email(query.getEmail())
                                                  .enquiryType(query.getEnquiryType())
                                                  .message(query.getMessage())
                                                  .reply(query.getReply())
                                                  .build())
                      .collect(Collectors.toList());
    }
    @Override
    public QueryDataPostResponse updateQuery(String id, String reply) {
        Optional<QueryData> optionalQuery = repo.findById(id);
        if (optionalQuery.isPresent()) {
            QueryData query = optionalQuery.get();
            query.setReply(reply);
            repo.save(query); // Save the updated entity
            return QueryDataPostResponse.builder().message("updated").build();
        } else {
            return QueryDataPostResponse.builder().message("Query not found").build();
        }
    }
    @Override
    public List<QueryDataGetResponse> getQueriesByEmail(String email) {
        List<QueryData> queries = repo.findByEmail(email);
        return queries.stream()
                      .map(query -> QueryDataGetResponse.builder()
                                                  .id(query.getId())
                                                  .courseName(query.getCourseName())
                                                  .email(query.getEmail())
                                                  .enquiryType(query.getEnquiryType())
                                                  .message(query.getMessage())
                                                  .reply(query.getReply())
                                                  .build())
                      .collect(Collectors.toList());
    }

}
