package com.britcertify.pravin.service;

import java.util.List;
// import java.util.Optional;

import com.britcertify.pravin.dto.request.PaymentRequestDTO;
import com.britcertify.pravin.dto.response.PaymentResponseDTO;

public interface PaymentService {
    String savePayment(PaymentRequestDTO request);

    List<PaymentResponseDTO> getAllPayments();

    PaymentResponseDTO getPaymentById(String id);

    List<PaymentResponseDTO> getPaymentsByEmail(String email);
}
