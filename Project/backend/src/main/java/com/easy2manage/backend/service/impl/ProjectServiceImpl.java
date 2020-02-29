package com.easy2manage.backend.service.impl;

import com.easy2manage.backend.model.Project;
import com.easy2manage.backend.repository.ProjectRepository;
import com.easy2manage.backend.service.ProjectService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Resource
    private ProjectRepository projectRepository;

    @Override
    public Project getProject(Integer id) {
        return projectRepository.getProjectById(id);
    }

    @Override
    public void createProject(Project project) {
        Project tmpProject = projectRepository.getProjectByName(project.getName());
        if (tmpProject != null) {
            throw new IllegalArgumentException("Project with such name already exists");
        }
        projectRepository.save(project);
    }

    @Override
    public Page<Project> getProjects(Integer limit, Integer offset) {
        Pageable pageable = new PageRequest(offset - 1, limit, new Sort(Sort.Direction.ASC, "name"));
        return projectRepository.findAll(pageable);
    }
}
