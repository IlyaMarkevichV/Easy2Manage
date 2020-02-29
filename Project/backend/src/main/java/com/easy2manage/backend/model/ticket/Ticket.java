package com.easy2manage.backend.model.ticket;

import com.easy2manage.backend.model.Project;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "ticket")
    @JsonManagedReference
    private TicketInfo ticketInfo;

    @OneToOne(cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JoinColumn(name = "parent_ticket_id")
    private Ticket parentTicket;

    //TODO - add other mapping
    @Column(name = "assignee_id")
    private Integer assignee;

    @Column(name = "reporter_id")
    private Integer reporter;

    @ManyToOne(cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "sprint_id")
    private Integer sprint;
}
