package com.britcertify.pravin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column
    private String id;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String mobileNumber;
    @Column
    private String date;
    @Column
    private String courseName;
    @Column
    private String fees;
    @Column
    private String paymentId;
    @Column
    private String status;
}