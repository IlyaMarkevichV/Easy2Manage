package com.easy2manage.backend.dto.user;

import lombok.Data;

@Data
public class UserDto {
    private Integer id;

    private String username;

    private String email;

    private String role;
}
