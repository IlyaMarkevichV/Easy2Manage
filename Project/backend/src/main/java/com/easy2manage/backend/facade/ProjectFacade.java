package com.easy2manage.backend.facade;

import com.easy2manage.backend.dto.project.CreateProjectDto;
import com.easy2manage.backend.dto.project.ProjectDto;

import java.util.List;

public interface ProjectFacade {
    ProjectDto createProject(CreateProjectDto createProjectDto);
    ProjectDto getProjectDto(Integer projectId);
    List<ProjectDto> getProjects(Integer limit, Integer offset);
    Integer getTotalNumber();
}
