package com.easy2manage.backend.controller;


import com.easy2manage.backend.dto.ticket.TicketDto;
import com.easy2manage.backend.dto.user.UserDto;
import com.easy2manage.backend.facade.TicketFacade;
import com.easy2manage.backend.facade.UserFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {
    @Resource
    private UserFacade userFacade;

    @GetMapping(value = "/getAll")
    public ResponseEntity<?> getTicket() {
        try {
            List<UserDto> users = userFacade.getAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't get users. " + e.getMessage());
        }
    }
}
