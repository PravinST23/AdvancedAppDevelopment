package com.britcertify.pravin.service;

import java.util.List;

import com.britcertify.pravin.dto.request.QueryDataRequest;
import com.britcertify.pravin.dto.response.QueryDataGetResponse;
import com.britcertify.pravin.dto.response.QueryDataPostResponse;

public interface QueryDataService {
    QueryDataPostResponse saveQuery(QueryDataRequest data);
    List<QueryDataGetResponse> getAllQueries();
}
