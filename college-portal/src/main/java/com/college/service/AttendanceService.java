package com.college.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.college.exception.AttendanceException;
import com.college.model.Attendance;
import com.college.model.Subject;
import com.college.model.User;
import com.college.repository.AttendanceRepository;
import com.college.repository.SubjectRepository;
import com.college.repository.UserRepository;

@Service
public class AttendanceService {

	    @Autowired
	    private AttendanceRepository attendanceRepo;

	    @Autowired
	    private UserRepository userRepo;

	    @Autowired
	    private SubjectRepository subjectRepo;

	    public Attendance markAttendance(
	            Long userId,
	            Long subjectId,
	            LocalDate date,
	            Boolean present
	    ) {

	        // ✅ Basic validation
	        if (userId == null || subjectId == null || date == null || present == null) {
	            throw new AttendanceException("Invalid attendance data", HttpStatus.BAD_REQUEST);
	        }

	        User user = userRepo.findById(userId)
	                .orElseThrow(() ->
	                        new AttendanceException("User not found", HttpStatus.NOT_FOUND)
	                );

	        Subject subject = subjectRepo.findById(subjectId)
	                .orElseThrow(() ->
	                        new AttendanceException("Subject not found", HttpStatus.NOT_FOUND)
	                );

	        if (attendanceRepo.existsByUserAndSubjectAndAttendanceDate(user, subject, date)) {
	            throw new AttendanceException(
	                    "Attendance already marked for this date",
	                    HttpStatus.CONFLICT
	            );
	        }

	        Attendance attendance = new Attendance();
	        attendance.setUser(user);
	        attendance.setSubject(subject);
	        attendance.setAttendanceDate(date);
	        attendance.setPresent(present);

	        return attendanceRepo.save(attendance);
	    }

	    public List<Attendance> getByUser(Long userId) {

	        if (!userRepo.existsById(userId)) {
	            throw new AttendanceException("User not found", HttpStatus.NOT_FOUND);
	        }

	        return attendanceRepo.findByUserId(userId);
	    }

	    public Attendance getById(Long id) {

	        return attendanceRepo.findById(id)
	                .orElseThrow(() ->
	                        new AttendanceException("Attendance not found", HttpStatus.NOT_FOUND)
	                );
	    }

	    public Attendance update(Long id, Boolean present) {

	        if (present == null) {
	            throw new AttendanceException("Invalid update data", HttpStatus.BAD_REQUEST);
	        }

	        Attendance attendance = attendanceRepo.findById(id)
	                .orElseThrow(() ->
	                        new AttendanceException("Attendance not found", HttpStatus.NOT_FOUND)
	                );

	        attendance.setPresent(present);

	        return attendanceRepo.save(attendance);
	    }

	    public void delete(Long id) {

	        if (!attendanceRepo.existsById(id)) {
	            throw new AttendanceException("Attendance not found", HttpStatus.NOT_FOUND);
	        }

	        attendanceRepo.deleteById(id);
	    }
}
