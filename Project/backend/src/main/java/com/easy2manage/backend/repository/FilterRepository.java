package com.easy2manage.backend.repository;

import com.easy2manage.backend.model.Dashboard;
import com.easy2manage.backend.model.Filter;
import org.springframework.data.repository.CrudRepository;

public interface FilterRepository extends CrudRepository<Filter, Integer> {
    Filter getFilterByDashboard(Dashboard dashboard);
    Filter getFilterById(Integer id);
    Filter getFilterByName(String name);
}
