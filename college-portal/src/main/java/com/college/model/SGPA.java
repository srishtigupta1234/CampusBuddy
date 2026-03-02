package com.college.model;


import jakarta.persistence.*;

@Entity
@Table(
    name = "sgpa",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "semester"})
    }
)
public class SGPA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int semester;

    private double sgpa;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Integer credits;
    
    // Getters & Setters

    public Integer getCredits() {
		return credits;
	}

	public void setCredits(Integer credits) {
		this.credits = credits;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
        return id;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public double getSgpa() {
        return sgpa;
    }

    public void setSgpa(double sgpa) {
        this.sgpa = sgpa;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

	public SGPA(Long id, int semester, double sgpa, User user, Integer credits) {
		super();
		this.id = id;
		this.semester = semester;
		this.sgpa = sgpa;
		this.user = user;
		this.credits = credits;
	}

	public SGPA() {
		super();
	}
    
}
