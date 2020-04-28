package com.easy2manage.backend.dto.dashboard;

import com.easy2manage.backend.dto.ticket.TicketDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDto {
    private Integer id;

    private String name;

    private List<TicketDto> tickets;
}
