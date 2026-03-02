package com.college.service;

import java.util.List;

import com.college.exception.ResourceException;
import com.college.exception.SubjectException;
import com.college.model.ResourceType;
import com.college.model.Resources;

public interface ResourceService {
	
	public Resources saveResource(Resources resource, Long subjectId) throws ResourceException , SubjectException;
	public  List<Resources> saveMultipleResources(
            List<Resources> resources, Long subjectId)
            throws ResourceException, SubjectException;
	public List<Resources> getAllResources() throws ResourceException;
	public List<Resources> getByType(ResourceType type) throws ResourceException ;
	public List<Resources> getBySubject(Long subjectId) throws ResourceException;
	public void deleteResource(Long id) throws ResourceException ;
	public Resources updateResource(Long id, Resources resource, Long subjectId)
	        throws ResourceException, SubjectException ;
}
