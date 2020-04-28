package com.easy2manage.backend.facade.impl;

import com.easy2manage.backend.dto.dashboard.CreateDashboardDto;
import com.easy2manage.backend.dto.dashboard.DashboardDto;
import com.easy2manage.backend.facade.DashboardFacade;
import com.easy2manage.backend.facade.TicketFacade;
import com.easy2manage.backend.model.Dashboard;
import com.easy2manage.backend.model.ticket.Ticket;
import com.easy2manage.backend.model.user.User;
import com.easy2manage.backend.service.DashboardService;
import com.easy2manage.backend.service.UserService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Component
public class DashboardFacadeImpl implements DashboardFacade {

    @Resource
    private UserService userService;

    @Resource
    private DashboardService dashboardService;

    @Resource
    private TicketFacade ticketFacade;

    @Override
    public DashboardDto createDashboard(CreateDashboardDto dto) {
        Dashboard dashboard = new Dashboard();
        dashboard.setName(dto.getName());

        User user = userService.getUserById(dto.getUserId());
        if (user == null) {
            throw new IllegalArgumentException("There is no assignee user with such id:" + dto.getUserId());
        }
        dashboard.setUser(user);

        return getInfoFromModel(dashboardService.createDashboard(dashboard));
    }

    @Override
    public DashboardDto getDashboard(Integer dashboardId) {
        if (dashboardId == null) {
            throw new IllegalArgumentException("Dashboard id can not be null");
        }

        Dashboard dashboard;

        try {
            dashboard = dashboardService.getDashboardById(dashboardId);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown exception.");
        }

        if (dashboard == null) {
            throw new NoSuchElementException();
        }

        return getInfoFromModel(dashboard);
    }

    @Override
    public List<DashboardDto> getAllUserDashboards(Integer userId) {
        return dashboardService.getAllUserDashboards(userId).stream()
                .map(this::getInfoFromModel).collect(Collectors.toList());
    }

    @Override
    public void deleteDashboard(Integer dashboardId) {
        dashboardService.deleteDashboard(dashboardId);
    }

    private DashboardDto getInfoFromModel(Dashboard dashboard) {
        DashboardDto dashboardDto = new DashboardDto();

        dashboardDto.setId(dashboard.getId());
        dashboardDto.setName(dashboard.getName());
        if (dashboard.getFilter() != null) {
            dashboardDto.setTickets(ticketFacade.getTicketsByFilter(dashboard.getFilter()));
        }

        return dashboardDto;
    }
}
