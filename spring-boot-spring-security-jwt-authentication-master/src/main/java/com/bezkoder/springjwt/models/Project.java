package com.bezkoder.springjwt.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long project_id;

    private String project_name;
    private String project_description;
    private Date startDate;
    private Date endDate;
    private ProjectStatus status;
    private ProjectType type;
    private double budget;
    private double cost;
    private double expectedRevenue;
    private Priority priority;

//    @ManyToOne
//    private Team team;
//    @OneToMany(mappedBy = "project")
//    private List<Task> tasks;
//    @ManyToOne
//    Consultant consultant;
//    @OneToMany(mappedBy = "project")
//    private List<Task> taskList;
    @ManyToMany
    List<Resources> resources;
}
