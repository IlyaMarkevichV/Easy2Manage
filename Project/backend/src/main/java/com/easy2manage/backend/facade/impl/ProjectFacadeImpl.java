package com.easy2manage.backend.facade.impl;

import com.easy2manage.backend.dto.project.CreateProjectDto;
import com.easy2manage.backend.dto.project.ProjectDto;
import com.easy2manage.backend.facade.ProjectFacade;
import com.easy2manage.backend.model.Project;
import com.easy2manage.backend.service.ProjectService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.NoSuchElementException;

@Component
public class ProjectFacadeImpl implements ProjectFacade {

    @Resource
    private ProjectService projectService;

    @Override
    public void createProject(CreateProjectDto createProjectDto) {
        Project project = new Project();

        project.setDescription(createProjectDto.getDescription());
        project.setName(createProjectDto.getName());

        try {
            projectService.createProject(project);
        } catch (IllegalArgumentException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new IllegalArgumentException("Unknown error");
        }
    }

    @Override
    public ProjectDto getProjectDto(Integer projectId) {
        if (projectId == null)
            throw new IllegalArgumentException("id can not be null");

        Project project;

        try {
            project = projectService.getProject(projectId);
        } catch (IllegalArgumentException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new IllegalArgumentException("error");
        }

        if (project == null) {
            throw new NoSuchElementException();
        }
        return getInfoFromModel(project);
    }

    private ProjectDto getInfoFromModel(Project project) {
        ProjectDto projectDto = new ProjectDto();

        projectDto.setName(project.getName());
        projectDto.setDescription(project.getDescription());
        projectDto.setId(project.getId());

        return projectDto;
    }
}
