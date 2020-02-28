package com.easy2manage.backend.service.impl;

import com.easy2manage.backend.model.ticket.Ticket;
import com.easy2manage.backend.repository.TicketRepository;
import com.easy2manage.backend.service.TicketService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class TicketServiceImpl implements TicketService {

    @Resource
    private TicketRepository ticketRepository;

    @Override
    public Ticket getTicketById(Integer id) {
        return ticketRepository.getTicketById(id);
    }

    @Override
    public Ticket getTicketByName(String name) {
        return ticketRepository.getTicketByName(name);
    }

    @Override
    public void createTicket(Ticket ticket) {
        try {
            Ticket testTicket = getTicketByName(ticket.getName());
            if (testTicket == null) {
                ticketRepository.save(ticket);
            } else {
                throw new IllegalArgumentException("Ticket with such name already exists.");
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown error");
        }
    }
}
