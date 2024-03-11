package com.britcertify.pravin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.britcertify.pravin.dto.request.PaymentRequestDTO;
import com.britcertify.pravin.dto.response.PaymentResponseDTO;
import com.britcertify.pravin.service.PaymentService;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> savePayment(@RequestBody PaymentRequestDTO request) {
        String response = paymentService.savePayment(request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        List<PaymentResponseDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/email/{email}")
    public ResponseEntity<List<PaymentResponseDTO>> getPaymentsByEmail(@PathVariable String email) {
        List<PaymentResponseDTO> payments = paymentService.getPaymentsByEmail(email);
        return ResponseEntity.ok(payments);
    }
}
