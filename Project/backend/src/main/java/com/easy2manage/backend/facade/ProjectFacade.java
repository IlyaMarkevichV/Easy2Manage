package com.easy2manage.backend.facade;

import com.easy2manage.backend.dto.project.CreateProjectDto;
import com.easy2manage.backend.dto.project.ProjectDto;

public interface ProjectFacade {
    void createProject(CreateProjectDto createProjectDto);
    ProjectDto getProjectDto(Integer projectId);
}
