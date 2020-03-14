package com.easy2manage.backend.dto.ticket;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateTicketDto {

    @NotBlank(message = "Name should not be blank.")
    private String name;

    private String description;

    @NotBlank(message = "Type should not be blank.")
    private String type;

    @NotBlank(message = "Priority should not be blank.")
    private String priority;

    @NotBlank(message = "Status should not be blank.")
    private String status;

    @NotNull(message = "Estimated should not be null.")
    @Min(value = 1, message = "Estimated should not be < 1.")
    private Float estimated;

    @NotNull(message = "Due date should not be null.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dueDate;

    @NotNull(message = "Project id should not be null.")
    private Integer projectId;

    private Integer parentTicketId;

    @NotNull(message = "Assignee id should not be null.")
    private Integer assigneeId;

    @NotNull(message = "Reporter id should not be null.")
    private Integer reporterId;

    //TODO uncomment when functionality is ready

    //@NotNull
    private Integer sprintId;
}
