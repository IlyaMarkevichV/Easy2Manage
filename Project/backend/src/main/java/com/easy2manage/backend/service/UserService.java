package com.easy2manage.backend.service;

import com.easy2manage.backend.model.ticket.Ticket;
import com.easy2manage.backend.model.user.User;

import java.util.List;

public interface UserService {
    List<User> getAll();

    User getUserById(Integer id);

    User getUserByUsername(String username);

    User getUserByEmail(String email);

    User createUser(User user);
}
