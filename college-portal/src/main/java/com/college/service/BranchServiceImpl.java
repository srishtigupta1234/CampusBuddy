package com.college.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.exception.BranchException;
import com.college.model.Branch;
import com.college.repository.BranchRepository;

@Service
public class BranchServiceImpl implements BranchService {
	
	@Autowired
	public BranchRepository branchRepo;

	@Override
	public Branch saveBranch(Branch branch) throws BranchException {
		if(branch==null) {
			throw new BranchException("Provided Branch should not be null");
		}
		Branch branches = branchRepo.save(branch);
		return branches;
		
	}

    @Override
    public List<Branch> saveMultipleBranches(List<Branch> branches)
            throws BranchException {
        return branchRepo.saveAll(branches);
    }
	@Override
	public List<Branch> getAllBranch()  throws BranchException{
		List<Branch> branches = branchRepo.findAll();
		if(branches.isEmpty()) {
			throw new BranchException("No Branch found...");
		}
		return branches;
	}

	@Override
	public Branch getBranchById(Long id)throws BranchException{
		return branchRepo.findById(id)
                .orElseThrow(() -> new BranchException("Branch not found"));
	}

	@Override
	public String deleteBranch(Long id) throws BranchException {
		  Branch branch = branchRepo.findById(id)
		            .orElseThrow(() -> new BranchException("Branch not found"));

		    branchRepo.delete(branch);

		    return "Branch Deleted Successfully";
	}

	@Override
	public Branch updateBranch(Long id, Branch branch) throws BranchException {

	    if (branch == null) {
	        throw new BranchException("Branch data should not be null");
	    }

	    // Find existing branch
	    Branch existingBranch = branchRepo.findById(id)
	            .orElseThrow(() -> new BranchException("Branch not found with id: " + id));

	    // Update fields
	    existingBranch.setName(branch.getName());
	    existingBranch.setCode(branch.getCode());
	    existingBranch.setDescription(branch.getDescription());

	    // Save updated branch
	    return branchRepo.save(existingBranch);
	}

}
