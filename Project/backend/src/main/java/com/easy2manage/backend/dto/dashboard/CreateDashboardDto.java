package com.easy2manage.backend.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateDashboardDto {
    @NotBlank(message = "Name should not be blank.")
    private String name;

    @NotNull(message = "User id should not be null.")
    private Integer userId;
}
