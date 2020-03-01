package com.easy2manage.backend.dto.project;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProjectDto {
    @NotBlank(message = "Name should not be blank.")
    private String name;

    private String description;
}
