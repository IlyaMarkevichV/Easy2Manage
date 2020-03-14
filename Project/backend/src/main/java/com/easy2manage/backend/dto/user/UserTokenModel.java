package com.easy2manage.backend.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserTokenModel {
    UserDto user;
    String token;
}
