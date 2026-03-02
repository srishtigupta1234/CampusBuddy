package com.college.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.college.model.SGPA;
import com.college.model.User;

public interface SGPARepository
        extends JpaRepository<SGPA, Long> {

	 List<SGPA> findByUser(User user);
	 SGPA findByUserAndSemester(User user, int semester);
}
