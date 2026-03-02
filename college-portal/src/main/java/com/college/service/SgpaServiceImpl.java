package com.college.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.exception.SgpaException;
import com.college.exception.UserException;
import com.college.model.SGPA;
import com.college.model.User;
import com.college.repository.SGPARepository;

@Service
public class SgpaServiceImpl implements SgpaService{

	 @Autowired
	 private SGPARepository sgpaRepository;
	 
	 @Override
	 public SGPA saveSgpa(SGPA sgpa, User user) throws SgpaException {
	     try {
	         if (sgpa == null) {
	             throw new SgpaException("SGPA object cannot be null");
	         }

	         sgpa.setUser(user);  

	         return sgpaRepository.save(sgpa);

	     } catch (Exception e) {
	         throw new SgpaException("Failed to save SGPA: " + e.getMessage());
	     }
	 }

	    @Override
	    public SGPA updateSgpa(Long id, SGPA sgpa) throws SgpaException {
	        try {
	            Optional<SGPA> existing = sgpaRepository.findById(id);
	            if (existing.isEmpty()) {
	                throw new SgpaException("SGPA record not found with ID: " + id);
	            }
	            SGPA sgpaToUpdate = existing.get();
	            sgpaToUpdate.setSemester(sgpa.getSemester());
	            sgpaToUpdate.setSgpa(sgpa.getSgpa());
	            sgpaToUpdate.setUser(sgpa.getUser());
	            return sgpaRepository.save(sgpaToUpdate);
	        } catch (Exception e) {
	            throw new SgpaException("Failed to update SGPA: " + e.getMessage());
	        }
	    }

	    @Override
	    public SGPA getSgpaById(Long id) throws SgpaException {
	        return sgpaRepository.findById(id)
	                .orElseThrow(() -> new SgpaException("SGPA record not found with ID: " + id));
	    }
	    @Override
	    public List<SGPA> getSgpaByUser(User user) throws UserException {

	        if (user == null) {
	            throw new UserException("User cannot be null");
	        }

	        return sgpaRepository.findByUser(user); 
	    }

	    @Override
	    public void deleteSgpa(Long id) throws SgpaException {
	        try {
	            SGPA sgpa = sgpaRepository.findById(id)
	                    .orElseThrow(() -> new SgpaException("SGPA record not found with ID: " + id));
	            sgpaRepository.delete(sgpa);
	        } catch (Exception e) {
	            throw new SgpaException("Failed to delete SGPA: " + e.getMessage());
	        }
	    }

}
