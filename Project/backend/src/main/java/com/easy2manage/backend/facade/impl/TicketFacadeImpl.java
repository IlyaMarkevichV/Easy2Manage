package com.easy2manage.backend.facade.impl;

import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.ticket.TicketDto;
import com.easy2manage.backend.enums.ticket.TicketPriority;
import com.easy2manage.backend.enums.ticket.TicketStatus;
import com.easy2manage.backend.enums.ticket.TicketType;
import com.easy2manage.backend.facade.ProjectFacade;
import com.easy2manage.backend.facade.TicketFacade;
import com.easy2manage.backend.facade.UserFacade;
import com.easy2manage.backend.model.ticket.Ticket;
import com.easy2manage.backend.model.ticket.TicketInfo;
import com.easy2manage.backend.service.ProjectService;
import com.easy2manage.backend.service.TicketService;
import com.easy2manage.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Component
public class TicketFacadeImpl implements TicketFacade {

    @Resource
    private TicketService ticketService;

    @Resource
    private ProjectService projectService;

    @Resource
    private UserService userService;

    @Resource
    private ProjectFacade projectFacade;

    @Resource
    private UserFacade userFacade;

    @Override
    public TicketDto createTicket(CreateTicketDto dto) {
        TicketInfo ticketInfo = createInfoForNewTicket(dto);

        Ticket ticket = new Ticket();
        ticket.setName(dto.getName());

        Integer parentTicketId = dto.getParentTicketId();
        if (parentTicketId != null) {
            ticket.setParentTicket(ticketService.getTicketById(parentTicketId));
        }

        ticketInfo.setTicket(ticket);
        ticket.setTicketInfo(ticketInfo);
        ticket.setProject(projectService.getProject(dto.getProjectId()));
        ticket.setAssignee(userService.getUserById(dto.getAssigneeId()));
        ticket.setReporter(userService.getUserById(dto.getReporterId()));

        //TODO - add other fields like reported etc.

        return getDataFromModel(ticketService.createTicket(ticket));
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

    @Override
    public List<TicketDto> getTickets(Integer projectId, Integer limit, Integer offset) {
        try {
            Page<Ticket> tickets = ticketService.getTicketsByProject(projectId, limit, offset);
            if (tickets.getContent().size() == 0) {
                throw new NoSuchElementException();
            }

            List<TicketDto> dto = new ArrayList<>();
            tickets.getContent()
                    .forEach(ticket -> dto.add(getDataFromModel(ticket)));
            return dto;

        } catch (NoSuchElementException e) {
            throw e;
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown exception.");
        }
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
        ticketDto.setProject(projectFacade.getProjectDto(ticket.getProject().getId()));
        ticketDto.setAssignee(userFacade.getUserDto(ticket.getAssignee().getId()));
        ticketDto.setReporter(userFacade.getUserDto(ticket.getReporter().getId()));

        Ticket parent = ticket.getParentTicket();
        if (parent != null) {
            ticketDto.setParentTicket(getTicket(parent.getId()));
        }

        //TODO - add 1 set
        return ticketDto;
    }
}
