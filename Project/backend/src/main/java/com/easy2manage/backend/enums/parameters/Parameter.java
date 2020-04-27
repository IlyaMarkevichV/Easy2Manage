package com.easy2manage.backend.enums.parameters;

import com.easy2manage.backend.enums.ticket.TicketPriority;
import com.easy2manage.backend.enums.ticket.TicketStatus;
import com.easy2manage.backend.enums.ticket.TicketType;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum Parameter {
    NAME("name", null),
    DESCRIPTION("description", null),
    TYPE("type",
            Arrays.stream(TicketType.values())
                    .map(Enum::toString)
                    .collect(Collectors.toList())),
    STATUS("status",
            Arrays.stream(TicketStatus.values())
                    .map(Enum::toString)
                    .collect(Collectors.toList())),
    PRIORITY("priority",
            Arrays.stream(TicketPriority.values())
                    .map(Enum::toString)
                    .collect(Collectors.toList())),
    DUE_DATE("due_date", null),
    START_DATE("start_date", null),
    ASSIGNEE_ID("assignee_id", null),
    REPORTER_ID("reporter_id", null),
    PROJECT_ID("project_id", null),
    SPRINT_ID("sprint_id", null),
    PARENT_TICKET_ID("parent_ticket_id", null),
    ESTIMATED("estimated", null),
    LOGGED("logged", null),
    REMAINING("remaining", null);

    private String parameterName;
    private List<String> parameterValues;


    Parameter(String parameterName, List<String> parameterValues) {
        this.parameterName = parameterName;
        this.parameterValues = parameterValues;
    }

    public String getParameterName() {
        return parameterName;
    }

    public List<String> getParameterValues() {
        return parameterValues;
    }
}
