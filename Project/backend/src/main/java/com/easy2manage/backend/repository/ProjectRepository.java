package com.easy2manage.backend.repository;

import com.easy2manage.backend.model.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer>,
        PagingAndSortingRepository<Project, Integer> {
    Project getProjectById(Integer id);
    Project getProjectByName(String name);
    List<Project> getProjectsByReporterId(Integer id);
}
