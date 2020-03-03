package com.easy2manage.backend.dto.ticket;

import com.easy2manage.backend.dto.project.ProjectDto;
import com.easy2manage.backend.model.ticket.Ticket;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class TicketDto {
    private Integer id;

    private String name;

    private String description;

    private String type;

    private String priority;

    private String status;

    private Float estimated;

    private Float remaining;

    private Float logged;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dueDate;

    private ProjectDto project;

    private Ticket parentTicket;

    //TODO - change ids for dto, when functionality is ready
    private Integer assigneeId;

    private Integer reporterId;

    private Integer sprintId;
}
