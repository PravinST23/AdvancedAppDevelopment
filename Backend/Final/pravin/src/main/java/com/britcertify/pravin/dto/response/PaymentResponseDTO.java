package com.britcertify.pravin.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponseDTO {
    private String id;
    private String name;
    private String email;
    private String mobileNumber;
    private String date;
    private String courseName;
    private String fees;
    private String paymentId;
    private String status;
}
