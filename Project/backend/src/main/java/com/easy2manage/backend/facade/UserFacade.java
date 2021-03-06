package com.easy2manage.backend.facade;

import com.easy2manage.backend.dto.ticket.TicketDto;
import com.easy2manage.backend.dto.user.CreateUserDto;
import com.easy2manage.backend.dto.user.UserDto;

import java.util.List;

public interface UserFacade {
    List<UserDto> getAll();

    UserDto createUser(CreateUserDto dto);

    UserDto getUserDto(Integer userId);

    UserDto getUserByUsername(String username);
}
