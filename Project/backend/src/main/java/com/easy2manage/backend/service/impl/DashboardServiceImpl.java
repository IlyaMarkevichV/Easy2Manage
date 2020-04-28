package com.easy2manage.backend.service.impl;

import com.easy2manage.backend.model.Dashboard;
import com.easy2manage.backend.model.user.User;
import com.easy2manage.backend.repository.DashboardRepository;
import com.easy2manage.backend.service.DashboardService;
import com.easy2manage.backend.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Resource
    private DashboardRepository dashboardRepository;

    @Resource
    private UserService userService;

    @Override
    public Dashboard createDashboard(Dashboard dashboard) {
        try {
            return dashboardRepository.save(dashboard);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown error");
        }
    }

    @Override
    public Dashboard getDashboardById(Integer dashboardId) {
        return dashboardRepository.getDashboardById(dashboardId);
    }

    @Override
    public List<Dashboard> getAllUserDashboards(Integer userId) {
        try {
            User user = userService.getUserById(userId);
            if (user == null) {
                throw new NoSuchElementException("User with id " + userId + " is not found.");
            }
            return dashboardRepository.getDashboardsByUser(user);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown error");
        }
    }

    @Override
    public void deleteDashboard(Integer dashboardId) {
        Dashboard dashboard = getDashboardById(dashboardId);
        if (dashboard == null) {
            throw new NoSuchElementException("Dashboard with id " + dashboardId + " is not found.");
        }
        dashboard.setUser(null);

        try {
            dashboardRepository.delete(dashboard);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown error");
        }
    }
}
