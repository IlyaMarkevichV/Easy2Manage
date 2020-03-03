package com.easy2manage.backend.facade;

import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.ticket.TicketDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TicketFacade {
    TicketDto createTicket(CreateTicketDto dto);
    TicketDto getTicket(Integer ticketId);
    List<TicketDto> getTickets(Integer projectId, Integer limit, Integer offset);
}
