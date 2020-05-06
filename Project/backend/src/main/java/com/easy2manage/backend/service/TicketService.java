package com.easy2manage.backend.service;

import com.easy2manage.backend.model.ticket.Ticket;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TicketService {
    List<Ticket> getTicketsByQuery(String query);
    Ticket updateTicket(Ticket ticket);
    Ticket getTicketById(Integer id);
    Ticket getTicketByName(String name);
    Ticket createTicket(Ticket ticket);
    Page<Ticket> getTicketsByProject(Integer projectId, Integer limit, Integer offset);
    Integer getTotalNumber();
}
