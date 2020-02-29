package com.easy2manage.backend.service;


import com.easy2manage.backend.model.Project;

public interface ProjectService {
    Project getProject(Integer id);
    void createProject(Project project);
}
