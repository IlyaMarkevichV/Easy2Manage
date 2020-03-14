package com.easy2manage.backend.service.impl;

import com.easy2manage.backend.model.user.User;
import com.easy2manage.backend.repository.UserRepository;
import com.easy2manage.backend.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserRepository userRepository;

    @Override
    public User getUserById(Integer id) {
        return userRepository.getUserById(id);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    @Override
    public User createUser(User user) {
        User tmpUser = userRepository.getUserByUsername(user.getUsername());
        if (tmpUser != null) {
            throw new IllegalArgumentException("User with such username already exists.");
        }

        tmpUser = userRepository.getUserByEmail(user.getEmail());
        if (tmpUser != null) {
            throw new IllegalArgumentException("User with such email already exists.");
        }
        return userRepository.save(user);
    }
}
