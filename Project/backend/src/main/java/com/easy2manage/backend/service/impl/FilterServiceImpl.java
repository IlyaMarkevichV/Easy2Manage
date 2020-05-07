package com.easy2manage.backend.service.impl;

import com.easy2manage.backend.dto.filter.ParamDto;
import com.easy2manage.backend.model.Dashboard;
import com.easy2manage.backend.model.Filter;
import com.easy2manage.backend.repository.FilterRepository;
import com.easy2manage.backend.service.DashboardService;
import com.easy2manage.backend.service.FilterService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.NoSuchElementException;

@Service
public class FilterServiceImpl implements FilterService {
    private static final String SELECT_PREFIX = "SELECT * FROM ticket " +
            "INNER JOIN ticket_info ON ticket.id = ticket_info.ticket_id ";
    private static final String PARAM_END = " )";
    private static final String PARAM_START = " ( ";
    private static final String AND = " AND";
    private static final String OR = " OR ";
    private static final String PERCENT = "%";
    private static final String LIKE = " LIKE ";

    @Resource
    private FilterRepository filterRepository;

//    @Resource
//    private TicketRepository ticketRepository;

    @Resource
    private DashboardService dashboardService;

    @Override
    public Filter createFilter(Filter filter) {
//        User user = filter.getDashboard().getUser();
//        Ticket ticket = ticketRepository.findTicketsByAssigneeOrReporter(user, user).get(0);
//        if (ticket == null) {
//            throw new IllegalArgumentException("User is not assigned on a project.");
//        }

        //Project project = ticket.getProject();
//        if (project == null) {
//            throw new IllegalArgumentException("Project is not found.");
//        }

        filter.setQuery(SELECT_PREFIX);
        try {
            return filterRepository.save(filter);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown exception.");
        }
    }

    @Override
    public Filter addParamToQuery(Filter filter, ParamDto dto) {
        StringBuilder query = new StringBuilder(filter.getQuery());

        if(query.toString().contains("WHERE")) {
            query.append(AND + PARAM_START).append(dto.getParamName().toLowerCase()).append(LIKE);
        } else {
            query.append("WHERE" + PARAM_START).append(dto.getParamName().toLowerCase()).append(LIKE);
        }

        for (String value : dto.getParamValues()) {
            query.append("'").append(addModifier(dto.getModifier(), value)).append("'");
            if (!value.equals(dto.getParamValues().get(dto.getParamValues().size() - 1))) {
                query.append(OR);
            }
        }

        query.append(PARAM_END);

        filter.setQuery(query.toString());
        try {
            return filterRepository.save(filter);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown error");
        }
    }

    @Override
    public Filter getFilterById(Integer filterId) {
        Filter filter = filterRepository.getFilterById(filterId);
        if (filter == null) {
            throw new NoSuchElementException("Filter with id " + filterId + " is npt found.");
        }
        return filter;
    }

    private String addModifier(String modifier, String value) {
        if (modifier == null) {
            return value;
        }

        switch (modifier) {
            case "STARTS_WITH":
                return value + PERCENT;
            case "ENDS_WITH":
                return PERCENT + value;
            case "CONTAINS":
                return PERCENT + value + PERCENT;
            default:
                return value;
        }
    }

    @Override
    public void deleteFilter(Integer dashboardId) {
        Dashboard dashboard = dashboardService.getDashboardById(dashboardId);
        if(dashboard == null)
            throw new IllegalArgumentException("Dashboard with such id:" + dashboardId +" does not exists");
        Filter filter = dashboard.getFilter();
        filterRepository.deleteById(filter.getId());
    }
}
