package com.college.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.college.exception.ResourceException;
import com.college.exception.SubjectException;
import com.college.model.ResourceType;
import com.college.model.Resources;
import com.college.service.ResourceService;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin("*") 
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/subject/{subjectId}")
    public ResponseEntity<Resources> saveResource(
            @RequestBody Resources resource,
            @PathVariable Long subjectId)
            throws SubjectException, ResourceException {

    	System.out.println(resource);
    	System.out.println(subjectId);
        Resources saved = resourceService.saveResource(resource, subjectId);
        
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Resources> updateResource(
            @PathVariable Long id,
            @RequestBody Resources resource,
            @RequestParam(required = false) Long subjectId)
            throws ResourceException, SubjectException {

        Resources updated =
                resourceService.updateResource(id, resource, subjectId);

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/subject/{subjectId}/multiple")
    public List<Resources> createMultipleResources(
            @RequestBody List<Resources> resources,
            @PathVariable Long subjectId)
            throws ResourceException, SubjectException {

        return resourceService.saveMultipleResources(resources, subjectId);
    }
   
    @GetMapping
    public ResponseEntity<List<Resources>> getAllResources()
            throws ResourceException {

        List<Resources> list = resourceService.getAllResources();

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

  
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Resources>> getByType(
            @PathVariable ResourceType type)
            throws ResourceException {

        List<Resources> list = resourceService.getByType(type);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

  
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Resources>> getBySubject(
            @PathVariable Long subjectId)
            throws ResourceException {

        List<Resources> list = resourceService.getBySubject(subjectId);

        System.out.println("Sub"+subjectId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResource(
            @PathVariable Long id)
            throws ResourceException {

        resourceService.deleteResource(id);

        return new ResponseEntity<>("Resource deleted successfully", HttpStatus.OK);
    }
}
