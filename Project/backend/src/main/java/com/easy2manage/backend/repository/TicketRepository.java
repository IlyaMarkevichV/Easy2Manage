package com.easy2manage.backend.repository;

import com.easy2manage.backend.model.ticket.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends
        CrudRepository<Ticket, Integer>,
        PagingAndSortingRepository<Ticket, Integer> {
    Ticket getTicketById(Integer id);

    Ticket getTicketByName(String name);

    Page<Ticket> findTicketsByProjectId(Pageable pageable, Integer projectId);
}
