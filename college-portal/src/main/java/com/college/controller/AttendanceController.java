package com.college.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.college.exception.AttendanceException;
import com.college.exception.UserException;
import com.college.model.Attendance;
import com.college.model.User;
import com.college.service.AttendanceService;
import com.college.service.UserRegisterService;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @Autowired
    private UserRegisterService userService;

    // ✅ MARK ATTENDANCE
    @PostMapping
    public ResponseEntity<Attendance> markAttendance(
            @RequestHeader("Authorization") String token,
            @RequestParam Long subjectId,
            @RequestParam String date,
            @RequestParam Boolean present
    ) throws UserException {

        String jwt = token.startsWith("Bearer ")
                ? token.substring(7)
                : token;

        User currentUser = userService.findUserProfileByJwt(jwt);

        LocalDate attendanceDate = LocalDate.parse(date);

        Attendance saved = service.markAttendance(
                currentUser.getId(),
                subjectId,
                attendanceDate,
                present
        );

        return ResponseEntity.ok(saved);
    }

    // ✅ GET MY ATTENDANCE
    @GetMapping
    public ResponseEntity<List<Attendance>> getMyAttendance(
            @RequestHeader("Authorization") String token
    ) throws UserException {

        String jwt = token.startsWith("Bearer ")
                ? token.substring(7)
                : token;

        User currentUser = userService.findUserProfileByJwt(jwt);

        return ResponseEntity.ok(
                service.getByUser(currentUser.getId())
        );
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Attendance> updateAttendance(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestParam Boolean present
    ) throws UserException {

        String jwt = token.startsWith("Bearer ")
                ? token.substring(7)
                : token;

        User currentUser = userService.findUserProfileByJwt(jwt);

        Attendance existing = service.getById(id);

        if (!existing.getUser().getId().equals(currentUser.getId())) {
            throw new AttendanceException("Not allowed", 
                    org.springframework.http.HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(
                service.update(id, present)
        );
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendance(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) throws UserException {

        String jwt = token.startsWith("Bearer ")
                ? token.substring(7)
                : token;

        User currentUser = userService.findUserProfileByJwt(jwt);

        Attendance existing = service.getById(id);

        if (!existing.getUser().getId().equals(currentUser.getId())) {
            throw new AttendanceException("Not allowed", 
                    org.springframework.http.HttpStatus.FORBIDDEN);
        }

        service.delete(id);

        return ResponseEntity.ok().build();
    }
}