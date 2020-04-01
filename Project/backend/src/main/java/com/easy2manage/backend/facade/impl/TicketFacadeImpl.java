package com.easy2manage.backend.facade.impl;

import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.ticket.TicketDto;
import com.easy2manage.backend.dto.ticket.UpdateTicketDto;
import com.easy2manage.backend.enums.ticket.TicketPriority;
import com.easy2manage.backend.enums.ticket.TicketStatus;
import com.easy2manage.backend.enums.ticket.TicketType;
import com.easy2manage.backend.facade.ProjectFacade;
import com.easy2manage.backend.facade.TicketFacade;
import com.easy2manage.backend.facade.UserFacade;
import com.easy2manage.backend.model.Project;
import com.easy2manage.backend.model.ticket.Ticket;
import com.easy2manage.backend.model.ticket.TicketInfo;
import com.easy2manage.backend.model.user.User;
import com.easy2manage.backend.service.ProjectService;
import com.easy2manage.backend.service.TicketService;
import com.easy2manage.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.persistence.Column;
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
        Project project = projectService.getProject(dto.getProjectId());
        if(project == null){
            throw new IllegalArgumentException("There is no project with such id:" + dto.getProjectId());
        }
        User assignee = userService.getUserById(dto.getAssigneeId());
        if(assignee == null){
            throw new IllegalArgumentException("There is no assignee user with such id:" + dto.getAssigneeId());
        }
        User reporter = userService.getUserById(dto.getReporterId());
        if(reporter == null){
            throw new IllegalArgumentException("There is no reporter user with such id:" + dto.getReporterId());
        }
        ticket.setProject(project);
        ticket.setAssignee(assignee);
        ticket.setReporter(reporter);


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

    @Override
    public TicketDto updateTicket(UpdateTicketDto dto) {
        Ticket ticket;
        try {
            ticket = ticketService.getTicketById(dto.getId());
            if (ticket == null) {
                throw (new NoSuchElementException("There is no ticket with such id:" +
                        dto.getId()));
            }
            if (dto.getAssigneeId() != null) {
                User user = userService.getUserById(dto.getAssigneeId());
                if (user == null) {
                    throw (new NoSuchElementException("There is no assignee with such id:" +
                            +dto.getAssigneeId()));
                }
                ticket.setAssignee(user);
            }

            if (dto.getName() != null) {
                ticket.setName(dto.getName());
            }

            if (dto.getDescription() != null) {
                ticket.getTicketInfo().setDescription(dto.getDescription());
            }

            if (dto.getDueDate() != null) {
                ticket.getTicketInfo().setDueDate(dto.getDueDate());
            }

            if (dto.getEstimated() != null) {
                ticket.getTicketInfo().setEstimated(dto.getEstimated());
            }

            if (dto.getPriority() != null) {
                ticket.getTicketInfo().setTicketPriority(TicketPriority.valueOf(dto.getPriority().toUpperCase()));
            }

            if (dto.getStatus() != null) {
                ticket.getTicketInfo().setTicketStatus(TicketStatus.valueOf(dto.getStatus().toUpperCase()));
            }

            if (dto.getType() != null) {
                ticket.getTicketInfo().setTicketType(TicketType.valueOf(dto.getType().toUpperCase()));
            }


            if(dto.getRemaining() != null){
                ticket.getTicketInfo().setRemaining(dto.getRemaining());
            }

            if(dto.getLogged() != null){
                ticket.getTicketInfo().setLogged(dto.getLogged());
            }



            ticket = ticketService.updateTicket(ticket);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Unknown exception");
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
