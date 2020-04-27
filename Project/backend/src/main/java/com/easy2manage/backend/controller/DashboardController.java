package com.easy2manage.backend.controller;

import com.easy2manage.backend.dto.dashboard.CreateDashboardDto;
import com.easy2manage.backend.dto.ticket.CreateTicketDto;
import com.easy2manage.backend.dto.ticket.TicketDto;
import com.easy2manage.backend.facade.DashboardFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/api/dashboard")
public class DashboardController {

    @Resource
    private DashboardFacade dashboardFacade;

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getDashboard(@PathVariable(name = "id") Integer dashboardId) {
        try {
            return ResponseEntity.ok(dashboardFacade.getDashboard(dashboardId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't get dashboard. " + e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAllUserDashboards(@RequestParam Integer userId) {
        try {
            return ResponseEntity.ok(dashboardFacade.getAllUserDashboards(userId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't get dashboards. " + e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping(value = "/create")
    public ResponseEntity<?> createDashboard(@RequestBody @Valid CreateDashboardDto dto) {
        try {
            return ResponseEntity.ok(dashboardFacade.createDashboard(dto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't create dashboard. " + e.getMessage());
        }
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteDashboard(@PathVariable(name = "id") Integer dashboardId) {
        try {
            dashboardFacade.deleteDashboard(dashboardId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't delete dashboard. " + e.getMessage());
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
