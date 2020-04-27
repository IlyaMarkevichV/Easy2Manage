package com.easy2manage.backend.facade;

import com.easy2manage.backend.dto.dashboard.CreateDashboardDto;
import com.easy2manage.backend.dto.dashboard.DashboardDto;
import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.ticket.TicketDto;
import com.easy2manage.backend.dto.ticket.UpdateTicketDto;
import com.easy2manage.backend.model.Dashboard;

import java.util.List;

public interface DashboardFacade {
    DashboardDto createDashboard(CreateDashboardDto dto);
    DashboardDto getDashboard(Integer dashboardId);
    List<DashboardDto> getAllUserDashboards(Integer userId);
    void deleteDashboard(Integer dashboardId);
}
