package com.easy2manage.backend.service;

import com.easy2manage.backend.model.user.Role;

public interface RoleService {
    Role getRoleById(Integer id);

    Role getRoleByName(String name);
}
