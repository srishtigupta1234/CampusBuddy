package com.college.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.EnumType;

@Entity
public class Resources {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Enumerated(EnumType.STRING)
	    private ResourceType type;   

	    private String title;

	    private String link;   
	    
	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "subject_id", nullable = false)
	    @JsonIgnoreProperties({"resources"})
	    private Subject subject;

		public Resources(Long id, ResourceType type, String title, String link, Subject subject) {
			super();
			this.id = id;
			this.type = type;
			this.title = title;
			this.link = link;
			this.subject = subject;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public ResourceType getType() {
			return type;
		}

		public void setType(ResourceType type) {
			this.type = type;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getLink() {
			return link;
		}

		public void setLink(String link) {
			this.link = link;
		}

		public Subject getSubject() {
			return subject;
		}

		public void setSubject(Subject subject) {
			this.subject = subject;
		}

		public Resources() {
			super();
		}
	    
	    
	
}
