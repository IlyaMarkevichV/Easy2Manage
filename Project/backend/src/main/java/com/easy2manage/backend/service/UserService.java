package com.easy2manage.backend.service;

import com.easy2manage.backend.model.user.User;

public interface UserService {
    User getUserById(Integer id);

    User getUserByUsername(String username);

    User getUserByEmail(String email);
}
