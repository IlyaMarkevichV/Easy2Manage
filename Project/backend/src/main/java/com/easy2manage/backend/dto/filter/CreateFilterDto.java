package com.easy2manage.backend.dto.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateFilterDto {

    @NotBlank(message = "Name should not be null.")
    private String name;

    @NotNull(message = "Dashboard id should not be null.")
    private Integer dashboardId;
}
