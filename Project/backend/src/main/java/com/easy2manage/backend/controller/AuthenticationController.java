package com.easy2manage.backend.controller;

import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.user.CreateUserDto;
import com.easy2manage.backend.facade.UserFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/user")
public class AuthenticationController {

    @Resource
    private UserFacade userFacade;

    @PostMapping(value = "/register")
    public ResponseEntity<?> createUser(@RequestBody @Valid CreateUserDto dto) {
        try {
            return ResponseEntity.ok(userFacade.createUser(dto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't create user. " + e.getMessage());
        }
    }
}
