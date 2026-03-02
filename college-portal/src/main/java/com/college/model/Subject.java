package com.college.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Subject {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	// 2024, 2025, 2026...
	private Integer academicYear;

	// 1,2,3,4,5,6
	private Integer semester;

	@ManyToOne
	@JoinColumn(name = "branch_id")
	@JsonIgnoreProperties("subjects")
	private Branch branch;

	@OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("subject")
	private List<Resources> resources;

	public Long getId() {
		return id;
	}

	public Integer getAcademicYear() {
		return academicYear;
	}

	public void setAcademicYear(Integer academicYear) {
		this.academicYear = academicYear;
	}

	public Integer getSemester() {
		return semester;
	}

	public void setSemester(Integer semester) {
		this.semester = semester;
	}

	public Branch getBranch() {
		return branch;
	}

	public void setBranch(Branch branch) {
		this.branch = branch;
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
	public Subject() {
		super();
	}

	public List<Resources> getResources() {
		return resources;
	}

	public void setResources(List<Resources> resources) {
		this.resources = resources;
	}

	public Subject(Long id, String name, Integer academicYear, Integer semester, Branch branch,
			List<Resources> resources) {
		super();
		this.id = id;
		this.name = name;
		this.academicYear = academicYear;
		this.semester = semester;
		this.branch = branch;
		this.resources = resources;
	}
	
	

}
