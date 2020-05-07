package com.easy2manage.backend.facade;

import com.easy2manage.backend.dto.filter.CreateFilterDto;
import com.easy2manage.backend.dto.filter.FilterDto;
import com.easy2manage.backend.dto.filter.ParamDto;

public interface FilterFacade {
    FilterDto createFilter(CreateFilterDto dto);
    FilterDto addParam(ParamDto dto);
    void deleteFilter(Integer dashboardId);
}
