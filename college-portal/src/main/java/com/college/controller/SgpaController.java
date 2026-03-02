package com.college.controller;


import com.college.exception.SgpaException;
import com.college.exception.UserException;
import com.college.model.SGPA;
import com.college.model.User;
import com.college.service.SgpaService;
import com.college.service.UserRegisterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sgpa")
public class SgpaController {

    @Autowired
    private SgpaService sgpaService;
    @Autowired
    private UserRegisterService userService;

    @PostMapping
    public ResponseEntity<SGPA> addSgpa(
            @RequestBody SGPA sgpa,
            @RequestHeader("Authorization") String token
    ) throws Exception {

        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;

        User currentUser = userService.findUserProfileByJwt(jwt);

        SGPA savedSgpa = sgpaService.saveSgpa(sgpa, currentUser);

        return ResponseEntity.ok(savedSgpa);
    }
    @PutMapping("/{id}")
    public ResponseEntity<SGPA> updateSgpa(@PathVariable Long id, @RequestBody SGPA sgpa) throws SgpaException {
        SGPA updated = sgpaService.updateSgpa(id, sgpa);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SGPA> getSgpa(@PathVariable Long id) throws SgpaException {
        SGPA sgpa = sgpaService.getSgpaById(id);
        return ResponseEntity.ok(sgpa);
    }

    @GetMapping("/user")
    public ResponseEntity<List<SGPA>> getSgpaForCurrentUser(
            @RequestHeader("Authorization") String token) throws UserException {

        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;

        User currentUser = userService.findUserProfileByJwt(jwt);

        List<SGPA> sgpaList = sgpaService.getSgpaByUser(currentUser);

        return ResponseEntity.ok(sgpaList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSgpa(@PathVariable Long id) throws SgpaException {
        sgpaService.deleteSgpa(id);
        return ResponseEntity.ok("SGPA record deleted successfully!");
    }
}
