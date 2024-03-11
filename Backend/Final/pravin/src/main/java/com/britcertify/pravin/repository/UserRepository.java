package com.britcertify.pravin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.britcertify.pravin.model.User;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);
    // User findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByMobilenumber(String mobilenumber);
}
