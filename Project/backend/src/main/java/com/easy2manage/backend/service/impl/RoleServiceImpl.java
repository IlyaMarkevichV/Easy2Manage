package com.easy2manage.backend.service.impl;

import com.easy2manage.backend.model.user.Role;
import com.easy2manage.backend.repository.RoleRepository;
import com.easy2manage.backend.service.RoleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class RoleServiceImpl implements RoleService {

    @Resource
    private RoleRepository roleRepository;

    @Override
    public Role getRoleById(Integer id) {
        return roleRepository.getRoleById(id);
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepository.getRoleByName(name);
    }
}
