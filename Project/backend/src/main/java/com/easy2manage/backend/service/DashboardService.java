package com.easy2manage.backend.service;

import com.easy2manage.backend.model.Dashboard;

import java.util.List;

public interface DashboardService {
    Dashboard createDashboard(Dashboard dashboard);
    Dashboard getDashboardById(Integer dashboardId);
    List<Dashboard> getAllUserDashboards(Integer userId);
    void deleteDashboard(Integer dashboardId);
}
