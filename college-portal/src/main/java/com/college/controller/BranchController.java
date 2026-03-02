package com.college.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.college.exception.BranchException;
import com.college.model.Branch;
import com.college.service.BranchService;

@RestController
@RequestMapping("/api/branch")
public class BranchController {

	@Autowired
	public BranchService branchService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<Branch> createBranch(@RequestBody Branch branch) throws BranchException {
		Branch branchs = branchService.saveBranch(branch);
		return new ResponseEntity<Branch>(branchs, HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/multiple")
	public List<Branch> createMultipleBranches(@RequestBody List<Branch> branches) throws BranchException {
		return branchService.saveMultipleBranches(branches);
	}

	@GetMapping("/{Id}")
	public ResponseEntity<Branch> getBranchById(@PathVariable Long Id) throws BranchException {
		Branch branchs = branchService.getBranchById(Id);
		return new ResponseEntity<Branch>(branchs, HttpStatus.OK);
	}

	@GetMapping("/")
	public ResponseEntity<List<Branch>> getAllBranch() throws BranchException {
		List<Branch> branchs = branchService.getAllBranch();
		return new ResponseEntity<List<Branch>>(branchs, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/delete/{Id}")
	public ResponseEntity<String> deleteBranchById(@PathVariable Long Id) throws BranchException {
		branchService.deleteBranch(Id);
		return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
	}
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/update/{id}")
	public ResponseEntity<Branch> updateBranch(
	        @PathVariable Long id,
	        @RequestBody Branch branch) throws BranchException {

	    Branch updatedBranch = branchService.updateBranch(id, branch);

	    return new ResponseEntity<>(updatedBranch, HttpStatus.OK);
	}

}
