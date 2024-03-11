package com.britcertify.pravin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.britcertify.pravin.model.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, String> {

    List<Payment> findByEmail(String email);
}
