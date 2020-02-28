package com.easy2manage.backend.service;

import com.easy2manage.backend.model.ticket.Ticket;

public interface TicketService {
    Ticket getTicketById(Integer id);
    Ticket getTicketByName(String name);
    void createTicket(Ticket ticket);
}
