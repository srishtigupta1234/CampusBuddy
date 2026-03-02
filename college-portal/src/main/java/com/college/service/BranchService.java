package com.college.service;

import java.util.List;

import com.college.exception.BranchException;
import com.college.model.Branch;

public interface BranchService {

	public Branch saveBranch(Branch branch) throws BranchException;
	public Branch updateBranch(Long id, Branch branch) throws BranchException;
	public List<Branch> getAllBranch()throws BranchException;
	public List<Branch> saveMultipleBranches(List<Branch> branches) throws BranchException;
	public Branch getBranchById(Long id) throws BranchException;
	public String deleteBranch(Long id) throws BranchException;
}
