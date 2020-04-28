package com.easy2manage.backend.dto.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ParamDto {

    private Integer dashboardId;

    private String paramName;

    private List<String> paramValues;

    private String modifier;
}
