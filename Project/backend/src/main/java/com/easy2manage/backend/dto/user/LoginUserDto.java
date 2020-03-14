package com.easy2manage.backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class LoginUserDto {
    @NotBlank(message = "Username should not be empty.")
    private String username;

    @NotBlank(message = "Password should not be empty.")
    private String password;
}
