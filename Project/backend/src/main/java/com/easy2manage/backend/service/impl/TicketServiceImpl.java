package com.easy2manage.backend.service.impl;

import com.easy2manage.backend.model.ticket.Ticket;
import com.easy2manage.backend.repository.QueryManager;
import com.easy2manage.backend.repository.TicketRepository;
import com.easy2manage.backend.service.TicketService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    @Resource
    private QueryManager queryManager;

    @Resource
    private TicketRepository ticketRepository;

    @Override
    public Ticket updateTicket(Ticket ticket) {
        try {
            ticketRepository.save(ticket);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown error");
        }
        return ticket;
    }

    @Override
    public Ticket getTicketById(Integer id) {
        return ticketRepository.getTicketById(id);
    }

    @Override
    public Ticket getTicketByName(String name) {
        return ticketRepository.getTicketByName(name);
    }

    @Override
    public Ticket createTicket(Ticket ticket) {
        try {
            Ticket testTicket = getTicketByName(ticket.getName());
            if (testTicket == null) {
                return ticketRepository.save(ticket);
            } else {
                throw new IllegalArgumentException("Ticket with such name already exists.");
            }
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new IllegalArgumentException("Unknown error");
        }
    }

    @Override
    public Page<Ticket> getTicketsByProject(Integer projectId, Integer limit, Integer offset) {
        Pageable pageable = new PageRequest(offset - 1, limit, new Sort(Sort.Direction.ASC, "name"));
        if (projectId == null) {
            return ticketRepository.findAll(pageable);
        }

        return ticketRepository.findTicketsByProjectId(pageable, projectId);
    }

    @Override
    public Integer getTotalNumber() {
        return ((List<Ticket>) ticketRepository.findAll()).size();
    }

    @Override
    public List<Ticket> getTicketsByQuery(String query) {
        List<Ticket> tickets = new ArrayList<>();

        queryManager.getTicketIds(query).forEach(id -> tickets.add(getTicketById(id)));

        return tickets;
    }

}
