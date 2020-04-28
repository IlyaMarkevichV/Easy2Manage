package com.easy2manage.backend.service;

import com.easy2manage.backend.dto.filter.ParamDto;
import com.easy2manage.backend.model.Filter;

public interface FilterService {
    Filter createFilter(Filter filter);
    Filter addParamToQuery(Filter filter, ParamDto dto);
    Filter getFilterById(Integer filterId);
}
