package com.college.service;

import java.util.List;

import com.college.exception.BranchException;
import com.college.exception.SubjectException;
import com.college.model.Subject;

public interface SubjectService {

	public Subject saveSubject(Subject subject,Long branchId) throws BranchException,SubjectException;
	public  List<Subject> saveMultipleSubjects(List<Subject> subjects, Long branchId)
            throws BranchException, SubjectException;
	public Subject updateSubject(Long id, Subject subject, Long branchId)
	        throws SubjectException, BranchException;
	public List<Subject> getAllSubject() throws SubjectException;
	public Subject getSubjectbyId(Long id) throws SubjectException;
	public List<Subject> getByBranch(Long branchId) throws SubjectException;
	public void deleteSubject(Long id) throws SubjectException;
}
