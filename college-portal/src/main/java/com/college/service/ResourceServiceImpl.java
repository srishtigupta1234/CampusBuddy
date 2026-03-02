package com.college.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.exception.ResourceException;
import com.college.exception.SubjectException;
import com.college.model.ResourceType;
import com.college.model.Resources;
import com.college.model.Subject;
import com.college.repository.ResourceRepository;
import com.college.repository.SubjectRepository;

@Service
public class ResourceServiceImpl implements ResourceService{
	@Autowired
    private ResourceRepository resourceRepo;

    @Autowired
    private SubjectRepository subjectRepo;

    @Override
    public Resources saveResource(Resources resource, Long subjectId)
            throws SubjectException, ResourceException {

        Subject subject = subjectRepo.findById(subjectId)
                .orElseThrow(() -> new SubjectException("Subject not found"));

        resource.setSubject(subject);

        return resourceRepo.save(resource);
    }
    @Override
    public List<Resources> saveMultipleResources(
            List<Resources> resources, Long subjectId)
            throws SubjectException {

        Subject subject = subjectRepo.findById(subjectId)
                .orElseThrow(() ->
                        new SubjectException("Subject not found"));

        resources.forEach(res -> res.setSubject(subject));

        return resourceRepo.saveAll(resources);
    }


	@Override
	public List<Resources> getAllResources() throws ResourceException {
		List<Resources> res = resourceRepo.findAll();
		if(res.isEmpty()) {
			throw new ResourceException("Resources are Empty...");
		}
		return res;
	}

	@Override
	public List<Resources> getByType(ResourceType type)throws ResourceException {
		 List<Resources> res = resourceRepo.findByType(type);
		 if(res == null) {
				throw new ResourceException("No Resources found with provided resource type...");
			}
		return res;
	}

	@Override
	public List<Resources> getBySubject(Long subjectId)throws ResourceException {
		 List<Resources> res = resourceRepo.findBySubjectId(subjectId);
		 if(res == null) {
				throw new ResourceException("Resources not found with provided Subject Id");
			}
			return res;
	}

	@Override
	public void deleteResource(Long id) throws ResourceException {

	    Resources res = resourceRepo.findById(id)
	            .orElseThrow(() -> new ResourceException("Resource not found"));

	    resourceRepo.delete(res);
	}

	@Override
	public Resources updateResource(Long id, Resources resource, Long subjectId)
	        throws ResourceException, SubjectException {

	    Resources existing = resourceRepo.findById(id)
	            .orElseThrow(() ->
	                    new ResourceException("Resource not found with id: " + id));

	    if (subjectId != null) {
	        Subject subject = subjectRepo.findById(subjectId)
	                .orElseThrow(() ->
	                        new SubjectException("Subject not found with id: " + subjectId));

	        existing.setSubject(subject);
	    }

	    if (resource.getTitle() != null)
	        existing.setTitle(resource.getTitle());

	    if (resource.getLink() != null)
	        existing.setLink(resource.getLink());

	    if (resource.getType() != null)
	        existing.setType(resource.getType());

	    return resourceRepo.save(existing);
	}

}
