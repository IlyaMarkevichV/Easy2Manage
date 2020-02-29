package com.easy2manage.backend.model.ticket;

import com.easy2manage.backend.enums.ticket.TicketPriority;
import com.easy2manage.backend.enums.ticket.TicketStatus;
import com.easy2manage.backend.enums.ticket.TicketType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "ticket_info")
public class TicketInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "description")
    private String description;

    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "estimated")
    private Float estimated;

    @Column(name = "remaining")
    private Float remaining;

    @Column(name = "logged")
    private Float logged;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

    @Column(name = "priority")
    @Enumerated(EnumType.STRING)
    private TicketPriority ticketPriority;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private TicketStatus ticketStatus;

    @OneToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    @JsonBackReference
    private Ticket ticket;
}
