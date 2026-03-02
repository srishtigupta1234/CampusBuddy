package com.college.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.exception.BranchException;
import com.college.exception.SubjectException;
import com.college.model.Branch;
import com.college.model.Subject;
import com.college.repository.BranchRepository;
import com.college.repository.SubjectRepository;

@Service
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectRepository subjectRepo;

    @Autowired
    private BranchRepository branchRepo;

    @Override
    public Subject saveSubject(Subject subject, Long branchId)
            throws SubjectException, BranchException {

        Branch branch = branchRepo.findById(branchId)
                .orElseThrow(() -> new BranchException("Branch not found"));

        subject.setBranch(branch);

        if (subject.getAcademicYear() == null || subject.getSemester() == null) {
            throw new SubjectException("Academic year and semester are required");
        }

        return subjectRepo.save(subject);
        
    }

    @Override
    public List<Subject> saveMultipleSubjects(
            List<Subject> subjects, Long branchId)
            throws BranchException {

        Branch branch = branchRepo.findById(branchId)
                .orElseThrow(() -> new BranchException("Branch not found"));

        subjects.forEach(sub -> sub.setBranch(branch));

        return subjectRepo.saveAll(subjects);
    }
    @Override
    public List<Subject> getAllSubject() throws SubjectException {

        List<Subject> sub = subjectRepo.findAll();

        if (sub.isEmpty()) {
            throw new SubjectException("No subjects found");
        }

        return sub;
    }

    @Override
    public Subject getSubjectbyId(Long id) throws SubjectException {

        return subjectRepo.findById(id)
                .orElseThrow(() -> new SubjectException("Subject not found"));
    }
    
    @Override
    public List<Subject> getByBranch(Long branchId) throws SubjectException {

        List<Subject> list =
                subjectRepo.findByBranchId(branchId);

        if (list.isEmpty()) {
            throw new SubjectException(
                "No subjects found for branch id: " + branchId
            );
        }

        return list;
    }

    @Override
    public Subject updateSubject(Long id, Subject subject, Long branchId)
            throws SubjectException, BranchException {

        if (subject == null) {
            throw new SubjectException("Subject data cannot be null");
        }

        // Find existing subject
        Subject existingSubject = subjectRepo.findById(id)
                .orElseThrow(() -> new SubjectException("Subject not found with id: " + id));

        // If branchId is provided, update branch
        if (branchId != null) {
            Branch branch = branchRepo.findById(branchId)
                    .orElseThrow(() -> new BranchException("Branch not found with id: " + branchId));

            existingSubject.setBranch(branch);
        }

        // Update fields safely
        if (subject.getName() != null)
            existingSubject.setName(subject.getName());

        if (subject.getAcademicYear() != null)
            existingSubject.setAcademicYear(subject.getAcademicYear());

        if (subject.getSemester() != null)
            existingSubject.setSemester(subject.getSemester());

        return subjectRepo.save(existingSubject);
    }
    @Override
    public void deleteSubject(Long id) throws SubjectException {

        Subject subject = subjectRepo.findById(id)
                .orElseThrow(() -> 
                    new SubjectException("Subject not found with id: " + id)
                );

        subjectRepo.delete(subject);
    }
    
}
