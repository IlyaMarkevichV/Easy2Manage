package com.easy2manage.backend.service;

import com.easy2manage.backend.model.ticket.Ticket;
import org.springframework.data.domain.Page;

public interface TicketService {
    Ticket getTicketById(Integer id);
    Ticket getTicketByName(String name);
    void createTicket(Ticket ticket);
    Page<Ticket> getTicketsByProject(Integer projectId, Integer limit, Integer offset);
}
