package com.college.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.college.exception.BranchException;
import com.college.exception.SubjectException;
import com.college.model.Subject;
import com.college.service.SubjectService;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin("*") 
public class SubjectController {

    @Autowired
    private SubjectService subjectService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/branch/{branchId}")
    public ResponseEntity<Subject> saveSubject(
            @PathVariable Long branchId,
            @RequestBody Subject subject)
            throws BranchException, SubjectException {

        Subject saved = subjectService.saveSubject(subject, branchId);
        System.out.println(saved);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/branch/{branchId}/multiple")
    public List<Subject> createMultipleSubjects(
            @RequestBody List<Subject> subjects,
            @PathVariable Long branchId)
            throws BranchException, SubjectException {

        return subjectService.saveMultipleSubjects(subjects, branchId);
    }


    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects()
            throws SubjectException {

        List<Subject> list = subjectService.getAllSubject();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

   
    @GetMapping("/{subjectId}")
    public ResponseEntity<Subject> getSubjectById(
            @PathVariable Long subjectId)
            throws SubjectException {

        Subject subject = subjectService.getSubjectbyId(subjectId);

        System.out.println(subjectId);
        return new ResponseEntity<>(subject, HttpStatus.OK);
    }
    
    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<Subject>> getByBranch(
            @PathVariable Long branchId)
            throws SubjectException {

        List<Subject> list = subjectService.getByBranch(branchId);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Subject> updateSubject(
            @PathVariable Long id,
            @RequestBody Subject subject,
            @RequestParam(required = false) Long branchId)
            throws SubjectException, BranchException {

        Subject updatedSubject =
                subjectService.updateSubject(id, subject, branchId);

        return new ResponseEntity<>(updatedSubject, HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSubject(@PathVariable Long id)
            throws SubjectException {

        subjectService.deleteSubject(id);

        return new ResponseEntity<>("Subject deleted successfully", HttpStatus.OK);
    }
    
}
