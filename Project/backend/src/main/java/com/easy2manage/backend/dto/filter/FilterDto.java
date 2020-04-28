package com.easy2manage.backend.dto.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FilterDto {
    private Integer id;

    private String name;

    private String query;

    private Integer dashboardId;
}
