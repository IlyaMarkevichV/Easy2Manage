package com.easy2manage.backend.facade.impl;

import com.easy2manage.backend.dto.filter.CreateFilterDto;
import com.easy2manage.backend.dto.filter.FilterDto;
import com.easy2manage.backend.dto.filter.ParamDto;
import com.easy2manage.backend.facade.FilterFacade;
import com.easy2manage.backend.model.Dashboard;
import com.easy2manage.backend.model.Filter;
import com.easy2manage.backend.repository.DashboardRepository;
import com.easy2manage.backend.service.DashboardService;
import com.easy2manage.backend.service.FilterService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class FilterFacadeImpl implements FilterFacade {

    @Resource
    private FilterService filterService;

    @Resource
    private DashboardService dashboardService;

    @Resource
    private DashboardRepository dashboardRepository;

    @Override
    public FilterDto createFilter(CreateFilterDto dto) {
        Filter filter = new Filter();
        filter.setName(dto.getName());

        Dashboard dashboard = dashboardService.getDashboardById(dto.getDashboardId());
        if (dashboard == null) {
            throw new IllegalArgumentException("There is no dashboard user with such id:" + dto.getDashboardId());
        }
        filter.setDashboard(dashboard);

        Filter temp = filterService.createFilter(filter);
        dashboard.setFilter(temp);
        dashboardRepository.save(dashboard);
        return getInfoFromModel(temp);
    }

    @Override
    public FilterDto addParam(ParamDto dto) {
        Dashboard dashboard = dashboardService.getDashboardById(dto.getDashboardId());
        return getInfoFromModel(filterService.addParamToQuery(dashboard.getFilter(), dto));
    }

    @Override
    public FilterDto deleteFilter(Integer dashboardId) {
        return null;
    }

    private FilterDto getInfoFromModel(Filter filter) {
        FilterDto dto = new FilterDto();

        dto.setId(filter.getId());
        dto.setName(filter.getName());
        dto.setQuery(filter.getQuery());
        dto.setDashboardId(filter.getDashboard().getId());

        return dto;
    }
}
