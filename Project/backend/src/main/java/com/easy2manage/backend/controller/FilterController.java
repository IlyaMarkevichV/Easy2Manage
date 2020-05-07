package com.easy2manage.backend.controller;

import com.easy2manage.backend.controller.validators.ParamValidator;
import com.easy2manage.backend.dto.filter.CreateFilterDto;
import com.easy2manage.backend.dto.filter.ParamDto;
import com.easy2manage.backend.facade.FilterFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/api/filter")
public class FilterController {

    @Resource
    private FilterFacade filterFacade;

    @Resource
    private ParamValidator paramValidator;

    @InitBinder
    private void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.addValidators(paramValidator);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<?> createFilter(@RequestParam Integer dashboardId,
                                          @RequestParam String name) {
        try {
            return ResponseEntity.ok(filterFacade.createFilter(new CreateFilterDto(name, dashboardId)));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Server problem, can't create filter. " + e.getMessage());
        }
    }

    @PostMapping(value = "/addParam")
    public ResponseEntity<?> addParam(@RequestBody @Validated ParamDto paramDto, BindingResult bindingResult) {
        boolean containsErrors = bindingResult.hasErrors();
        if (containsErrors) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(bindingResult.getAllErrors().toString());
        } else {
            try {
                return ResponseEntity.ok(filterFacade.addParam(paramDto));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Server problem, can't add parameter. " + e.getMessage());
            } catch (NoSuchElementException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }
    }

    @PostMapping(value = "/delete")
    public ResponseEntity<?> deleteFilter(@RequestParam Integer dashboardId) {
        try {
            filterFacade.deleteFilter(dashboardId);

            return ResponseEntity.status(200).build();
        }catch (IllegalArgumentException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unknown exception");
        }
    }
}
