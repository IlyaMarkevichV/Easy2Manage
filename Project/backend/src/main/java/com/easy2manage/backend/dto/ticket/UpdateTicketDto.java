package com.easy2manage.backend.dto.ticket;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTicketDto {
    private Integer id;

    private String name;

    private String description;

    private String type;

    private String priority;

    private String status;

    @Min(value = 1, message = "Estimated should not be < 1.")
    private Float estimated;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dueDate;


    private Integer assigneeId;

    private Float remaining;

    private Float logged;
//    //TODO uncomment when functionality is ready
//
//    //@NotNull
//    private Integer sprintId;
}
