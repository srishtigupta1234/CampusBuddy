package com.college.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.college.model.ResourceType;
import com.college.model.Resources;

@Repository
public interface ResourceRepository extends JpaRepository<Resources, Long> {

	List<Resources> findByType(ResourceType type);

	List<Resources> findBySubjectId(Long subjectId);
	
    List<Resources> findBySubjectIdAndType(
	            Long subjectId, ResourceType type);
    
    

}
