package com.easy2manage.backend.dto.user;

import com.easy2manage.backend.constrains.IsComplexPassword;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {

    @NotBlank(message = "Username should not be blank.")
    private String username;

    @NotBlank(message = "Password should not be blank.")
    @IsComplexPassword
    private String password;

    @NotBlank(message = "Email should not be blank.")
    private String email;
}
