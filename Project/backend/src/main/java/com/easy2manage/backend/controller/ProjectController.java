package com.easy2manage.backend.controller;

import com.easy2manage.backend.dto.project.CreateProjectDto;
import com.easy2manage.backend.dto.project.ProjectDto;
import com.easy2manage.backend.facade.ProjectFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/api/project")
public class ProjectController {

    @Resource
    private ProjectFacade projectFacade;

    @PostMapping(value = "/create")
    public ResponseEntity<?> createProject(@RequestBody @Valid CreateProjectDto dto) {
        try {
            projectFacade.createProject(dto);
            return ResponseEntity.ok("Successfully created.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't create project. " + e.getMessage());
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getProject(@PathVariable(name = "id") Integer projectId) {
        try {
            ProjectDto project = projectFacade.getProjectDto(projectId);
            return ResponseEntity.ok(project);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't get project. " + e.getMessage());
        }
        catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<?> getProjects(
            @RequestParam(name = "limit") Integer limit,
            @RequestParam(name = "offset") Integer offset) {
        try {
            return ResponseEntity.ok(projectFacade.getProjects(limit, offset));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't get projects. " + e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
