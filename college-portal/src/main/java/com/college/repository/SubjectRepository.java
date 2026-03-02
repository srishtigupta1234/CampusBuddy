package com.college.repository;

import org.springframework.stereotype.Repository;

import com.college.model.Subject;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findByBranchId(Long branchId);

    List<Subject> findByBranchIdAndAcademicYear(
            Long branchId,
            Integer academicYear
    );

    List<Subject> findByBranchIdAndAcademicYearAndSemester(
            Long branchId,
            Integer academicYear,
            Integer semester
    );
}

