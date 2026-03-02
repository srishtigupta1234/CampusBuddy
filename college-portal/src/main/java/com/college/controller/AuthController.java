package com.college.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.college.config.JwtResponse;
import com.college.config.JwtUtil;
import com.college.config.LoginRequest;
import com.college.exception.UserException;
import com.college.model.User;
import com.college.service.UserRegisterService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRegisterService registerService;
    

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) throws UserException {

    	System.out.println(user);
        User savedUser =
                registerService.registerUser(user);

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        Authentication auth =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        String token =
                jwtUtil.generateToken(request.getUsername());

        return ResponseEntity.ok(new JwtResponse(token));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser(
            @RequestHeader(value = "Authorization", required = false) String jwt) {
        
        // In a basic JWT setup, we don't actually DO anything to the token on the server.
        // We just tell the frontend "Okay, you are good to delete it now!"
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout successful. Please delete the token on the client side.");
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
