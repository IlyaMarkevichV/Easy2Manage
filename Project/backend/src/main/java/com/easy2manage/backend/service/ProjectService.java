package com.easy2manage.backend.service;


import com.easy2manage.backend.model.Project;
import org.springframework.data.domain.Page;

public interface ProjectService {
    Project getProject(Integer id);
    Project createProject(Project project);
    Page<Project> getProjects(Integer limit, Integer offset);
    Integer getTotalByReporter(Integer reporterId);
    Integer getTotalNumber();
}
