package com.easy2manage.backend.controller;

import com.easy2manage.backend.dto.StringResponse;
import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.ticket.TicketDto;
import com.easy2manage.backend.dto.ticket.UpdateTicketDto;
import com.easy2manage.backend.facade.TicketFacade;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.rmi.NoSuchObjectException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/api/ticket")
public class TicketController {

    @Resource
    private TicketFacade ticketFacade;

    @PostMapping(value = "/create")
    public ResponseEntity<?> createTicket(@RequestBody @Valid CreateTicketDto dto) {
        try {
            return ResponseEntity.ok(ticketFacade.createTicket(dto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't create ticket. " + e.getMessage());
        }
    }

    @PostMapping(value = "/update")
    public ResponseEntity<?> updateTicket(@RequestBody @Valid UpdateTicketDto dto) {
        try {
            return ResponseEntity.ok(ticketFacade.updateTicket(dto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't create ticket. " + e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getTicket(@PathVariable(name = "id") Integer ticketId) {
        try {
            TicketDto ticket = ticketFacade.getTicket(ticketId);
            return ResponseEntity.ok(ticket);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't get ticket. " + e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<?> getTicketsByProject(
            @RequestParam(name = "projectId") Integer projectId,
            @RequestParam(name = "limit") Integer limit,
            @RequestParam(name = "offset") Integer offset) {
        try {
            return ResponseEntity.ok(ticketFacade.getTickets(projectId, limit, offset));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't get tickets. " + e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(value = "/total")
    public ResponseEntity<?> getTotalTicketsNumber() {
        return ResponseEntity.ok(ticketFacade.getTotalNumber());
    }
}
