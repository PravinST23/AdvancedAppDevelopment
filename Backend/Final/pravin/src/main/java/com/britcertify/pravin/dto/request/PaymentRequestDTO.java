package com.britcertify.pravin.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {
    private String name;
    private String email;
    private String mobileNumber;
    private String date;
    private String courseName;
    private String fees;
    private String paymentId;
    private String status;
}
