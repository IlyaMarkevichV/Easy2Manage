package com.easy2manage.backend.facade.impl;

import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.ticket.TicketDto;
import com.easy2manage.backend.enums.ticket.TicketPriority;
import com.easy2manage.backend.enums.ticket.TicketStatus;
import com.easy2manage.backend.enums.ticket.TicketType;
import com.easy2manage.backend.facade.TicketFacade;
import com.easy2manage.backend.model.ticket.Ticket;
import com.easy2manage.backend.model.ticket.TicketInfo;
import com.easy2manage.backend.service.TicketService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;
import java.util.NoSuchElementException;

@Component
public class TicketFacadeImpl implements TicketFacade {

    @Resource
    private TicketService ticketService;

    @Override
    public void createTicket(CreateTicketDto dto) {
        TicketInfo ticketInfo = createInfoForNewTicket(dto);

        Ticket ticket = new Ticket();
        ticket.setName(dto.getName());

        Integer parentTicketId = dto.getParentTicketId();
        if (parentTicketId != null) {
            ticket.setParentTicket(ticketService.getTicketById(parentTicketId));
        }

        //TODO - add other fields like reported etc.

        ticketInfo.setTicket(ticket);
        ticket.setTicketInfo(ticketInfo);


        ticketService.createTicket(ticket);
    }

    @Override
    public TicketDto getTicket(Integer ticketId) {
        if (ticketId == null) {
            throw new IllegalArgumentException("Ticket id can not be null");
        }

        Ticket ticket;

        try {
            ticket = ticketService.getTicketById(ticketId);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown exception.");
        }

        if (ticket == null) {
            throw new NoSuchElementException();
        }

        return getDataFromModel(ticket);
    }

    private TicketInfo createInfoForNewTicket(CreateTicketDto dto) {
        TicketInfo ticketInfo = new TicketInfo();

        ticketInfo.setDescription(dto.getDescription());
        ticketInfo.setStartDate(new Date());
        ticketInfo.setDueDate(dto.getDueDate());
        ticketInfo.setEstimated(dto.getEstimated());
        ticketInfo.setRemaining(ticketInfo.getEstimated());
        ticketInfo.setLogged(0f);
        ticketInfo.setTicketType(TicketType.valueOf(dto.getType().toUpperCase()));
        ticketInfo.setTicketPriority(TicketPriority.valueOf(dto.getPriority().toUpperCase()));
        ticketInfo.setTicketStatus(TicketStatus.valueOf(dto.getStatus().toUpperCase()));

        return ticketInfo;
    }

    private TicketDto getDataFromModel(Ticket ticket) {
        TicketDto ticketDto = new TicketDto();
        TicketInfo ticketInfo = ticket.getTicketInfo();

        ticketDto.setId(ticket.getId());
        ticketDto.setName(ticket.getName());
        ticketDto.setDescription(ticketInfo.getDescription());
        ticketDto.setType(ticketInfo.getTicketType().toString());
        ticketDto.setPriority(ticketInfo.getTicketPriority().toString());
        ticketDto.setStatus(ticketInfo.getTicketStatus().toString());
        ticketDto.setEstimated(ticketInfo.getEstimated());
        ticketDto.setRemaining(ticketInfo.getRemaining());
        ticketDto.setLogged(ticketInfo.getLogged());
        ticketDto.setStartDate(ticketInfo.getStartDate());
        ticketDto.setDueDate(ticketInfo.getDueDate());
        //TODO - add 4 sets
        ticketDto.setParentTicket(ticket.getParentTicket());

        return ticketDto;
    }
}
