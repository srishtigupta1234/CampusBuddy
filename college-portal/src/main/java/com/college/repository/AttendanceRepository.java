package com.college.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.college.model.Attendance;
import com.college.model.Subject;
import com.college.model.User;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByUserId(Long userId);

    boolean existsByUserAndSubjectAndAttendanceDate(User user,Subject subject,LocalDate attendanceDate);

    long countByUserAndSubject(User user, Subject subject);

    long countByUserAndSubjectAndPresentTrue(User user,Subject subject);
}
