package com.college.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.college.config.JwtUtil; // <-- Imported your JwtUtil
import com.college.exception.UserException;
import com.college.model.User;
import com.college.repository.UserRepository;

@Service
public class UserRegisterService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil; // <-- Injected your utility

    public User registerUser(User user) throws UserException {
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            throw new UserException("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");
        }
        return userRepo.save(user);
    }

    /* =========================================
       Get User by JWT
    ========================================= */
    public User findUserProfileByJwt(String jwt) throws UserException {
        // 1. Extract the username using your method
        String username = jwtUtil.extractUsername(jwt); 
        
        // 2. Fetch the user from the database
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UserException("User not found with username: " + username));
                
        return user;
    }
}