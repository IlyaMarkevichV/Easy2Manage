package com.easy2manage.backend.service;

import com.easy2manage.backend.dto.user.LoginUserDto;
import com.easy2manage.backend.model.user.User;

public interface AuthenticationService {
    String login(LoginUserDto user);
}
