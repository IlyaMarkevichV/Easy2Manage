package com.easy2manage.backend.controller;

import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.user.CreateUserDto;
import com.easy2manage.backend.dto.user.LoginUserDto;
import com.easy2manage.backend.dto.user.UserDto;
import com.easy2manage.backend.dto.user.UserTokenModel;
import com.easy2manage.backend.facade.UserFacade;
import com.easy2manage.backend.service.AuthenticationService;
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

    @Resource
    private AuthenticationService authenticationService;

    @PostMapping(value = "/register")
    public ResponseEntity<?> createUser(@RequestBody @Valid CreateUserDto dto) {
        try {
            UserDto userDto = userFacade.createUser(dto);
            String token = authenticationService.login(new LoginUserDto(dto.getUsername(), dto.getPassword()));

            //Token should never be null, but...
            if (token != null) {
                return ResponseEntity.ok(new UserTokenModel(userDto, token));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Server problem, can't login.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't create user. " + e.getMessage());
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginUserDto dto) {
        String token = authenticationService.login(dto);
        if (token != null) {

            //Exception should never be thrown there...
            try {
                return ResponseEntity.ok(new UserTokenModel(userFacade.getUserByUsername(dto.getUsername()), token));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Server problem." + e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect username or password.");
        }
    }
}
