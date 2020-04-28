package com.easy2manage.backend.repository;

import com.easy2manage.backend.model.Dashboard;
import com.easy2manage.backend.model.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DashboardRepository extends CrudRepository<Dashboard, Integer> {
    Dashboard getDashboardById(Integer id);
    Dashboard getDashboardByUser(User user);
    Dashboard getDashboardByName(String name);
    List<Dashboard> getDashboardsByUser(User user);
}
