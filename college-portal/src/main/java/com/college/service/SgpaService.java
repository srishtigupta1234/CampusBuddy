package com.college.service;

import java.util.List;

import com.college.exception.SgpaException;
import com.college.exception.UserException;
import com.college.model.SGPA;
import com.college.model.User;

public interface SgpaService {

	   public SGPA saveSgpa(SGPA sgpa, User user) throws SgpaException;
	   public SGPA updateSgpa(Long id, SGPA sgpa) throws SgpaException;
	   public SGPA getSgpaById(Long id) throws SgpaException;
	   public List<SGPA> getSgpaByUser(User user) throws UserException;
	   public void deleteSgpa(Long id) throws SgpaException;
}
