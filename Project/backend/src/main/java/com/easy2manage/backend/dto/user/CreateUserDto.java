package com.easy2manage.backend.dto.user;

import com.easy2manage.backend.constrains.IsComplexPassword;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {

    @NotBlank(message = "Username should not be blank.")
    private String username;

    @NotBlank(message = "Password should not be blank.")
    @IsComplexPassword(message = "Password is too easy. It size must be more than 10. " +
            "It must contain numbers and latin letter of both upper and lower case.")
    private String password;

    @NotBlank(message = "Email should not be blank.")
    @Pattern(regexp = "^(.+)@(.+)$", message = "Incorrect email.")
    private String email;
}
