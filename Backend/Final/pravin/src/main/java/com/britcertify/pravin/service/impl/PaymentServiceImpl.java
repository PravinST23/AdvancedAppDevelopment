package com.britcertify.pravin.service.impl;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.britcertify.pravin.dto.request.PaymentRequestDTO;
import com.britcertify.pravin.dto.response.PaymentResponseDTO;
import com.britcertify.pravin.model.Payment;
import com.britcertify.pravin.repository.PaymentRepo;
import com.britcertify.pravin.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;

    public PaymentServiceImpl(PaymentRepo paymentRepo) {
        this.paymentRepo = paymentRepo;
    }

    @Override
    public String savePayment(PaymentRequestDTO request) {
        Payment payment = Payment.builder()
                .name(request.getName())
                .email(request.getEmail())
                .mobileNumber(request.getMobileNumber())
                .date(request.getDate())
                .courseName(request.getCourseName())
                .fees(request.getFees())
                .paymentId(request.getPaymentId())
                .status(request.getStatus())
                .build();
        paymentRepo.save(payment);
        return "Payment saved successfully";
    }

    @Override
    public List<PaymentResponseDTO> getAllPayments() {
        List<Payment> payments = paymentRepo.findAll();
        // Convert Payment entities to PaymentResponseDTO objects
        return payments.stream()
                .map(payment -> PaymentResponseDTO.builder()
                        .id(payment.getId())
                        .name(payment.getName())
                        .email(payment.getEmail())
                        .mobileNumber(payment.getMobileNumber())
                        .date(payment.getDate())
                        .courseName(payment.getCourseName())
                        .fees(payment.getFees())
                        .paymentId(payment.getPaymentId())
                        .status(payment.getStatus())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<PaymentResponseDTO> getPaymentsByEmail(String email) {
        Optional<List<Payment>> optionalPayments = Optional.ofNullable(paymentRepo.findByEmail(email));
        // Use map() to unwrap the Optional and convert the List<Payment> to List<PaymentResponseDTO>
        return optionalPayments.map(payments ->
                payments.stream()
                        .map(this::mapToDto)
                        .collect(Collectors.toList())
        ).orElseGet(() -> List.of()); // Return an empty list if optionalPayments is empty
    }

    private PaymentResponseDTO mapToDto(Payment payment) {
        return PaymentResponseDTO.builder()
                .id(payment.getId())
                .name(payment.getName())
                .email(payment.getEmail())
                .mobileNumber(payment.getMobileNumber())
                .date(payment.getDate())
                .courseName(payment.getCourseName())
                .fees(payment.getFees())
                .paymentId(payment.getPaymentId())
                .status(payment.getStatus())
                .build();
    }
    
    private List<PaymentResponseDTO> yourMapperMethod(List<Payment> payments) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'yourMapperMethod'");
    }

    @Override
    public PaymentResponseDTO getPaymentById(String id) {
        // Implement logic to get payment by id
        throw new UnsupportedOperationException("Method not implemented yet");
    }
}
