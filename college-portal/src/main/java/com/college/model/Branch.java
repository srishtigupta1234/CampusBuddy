package com.college.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Branch {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;
	    
	    private String code;
	    private String description;
	    
	    
	    @OneToMany(mappedBy = "branch")
	    @JsonIgnoreProperties("branch")
	    private List<Subject> subjects;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getCode() {
			return code;
		}

		public void setCode(String code) {
			this.code = code;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public Branch() {
			super();
		}

		public List<Subject> getSubjects() {
			return subjects;
		}

		public void setSubjects(List<Subject> subjects) {
			this.subjects = subjects;
		}

		public Branch(Long id, String name, String code, String description, List<Subject> subjects) {
			super();
			this.id = id;
			this.name = name;
			this.code = code;
			this.description = description;
			this.subjects = subjects;
		}
	    
		

}
