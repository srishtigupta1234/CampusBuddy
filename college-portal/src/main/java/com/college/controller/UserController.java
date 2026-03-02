package com.college.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.college.exception.UserException;
import com.college.model.User;
import com.college.service.UserRegisterService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRegisterService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(
            @RequestHeader("Authorization") String jwt) throws UserException {

        // 1. Remove "Bearer " prefix if it exists
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        // 2. Get the user
        User user = userService.findUserProfileByJwt(jwt);

        // 3. Clear the password before sending JSON back to React!
        user.setPassword(null); 

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}