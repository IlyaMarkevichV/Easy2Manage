package com.easy2manage.backend.facade.impl;

import com.easy2manage.backend.dto.user.CreateUserDto;
import com.easy2manage.backend.dto.user.UserDto;
import com.easy2manage.backend.facade.UserFacade;
import com.easy2manage.backend.model.user.User;
import com.easy2manage.backend.service.RoleService;
import com.easy2manage.backend.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Component
public class UserFacadeImpl implements UserFacade {
    @Resource
    private UserService userService;

    @Resource
    private RoleService roleService;

    @Resource
    private BCryptPasswordEncoder encoder;

    @Override
    public List<UserDto> getAll() {
        return userService.getAll().stream().map(this::getInfoFromModel).collect(Collectors.toList());
    }

    @Override
    public UserDto createUser(CreateUserDto dto) {
        User user = new User();

        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRole(roleService.getRoleByName("ROLE_USER"));

        try {
            return getInfoFromModel(userService.createUser(user));
        } catch (IllegalArgumentException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new IllegalArgumentException("Unknown error");
        }
    }

    @Override
    public UserDto getUserDto(Integer userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User id can not be null");
        }

        User user;

        try {
            user = userService.getUserById(userId);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown exception.");
        }

        if (user == null) {
            throw new NoSuchElementException();
        }

        return getInfoFromModel(user);
    }

    @Override
    public UserDto getUserByUsername(String username) {
        if (username == null) {
            throw new IllegalArgumentException("User id can not be null");
        }

        User user;

        try {
            user = userService.getUserByUsername(username);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown exception.");
        }

        if (user == null) {
            throw new NoSuchElementException();
        }

        return getInfoFromModel(user);
    }

    private UserDto getInfoFromModel(User user) {
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().getName());

        return userDto;
    }
}
