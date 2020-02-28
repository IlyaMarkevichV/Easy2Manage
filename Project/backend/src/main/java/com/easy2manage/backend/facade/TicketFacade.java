package com.easy2manage.backend.facade;

import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.ticket.TicketDto;

public interface TicketFacade {
    void createTicket(CreateTicketDto dto);
    TicketDto getTicket(Integer ticketId);
}
