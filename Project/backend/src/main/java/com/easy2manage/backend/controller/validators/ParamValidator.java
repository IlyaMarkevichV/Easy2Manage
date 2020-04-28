package com.easy2manage.backend.controller.validators;

import com.easy2manage.backend.dto.filter.ParamDto;
import com.easy2manage.backend.enums.parameters.Parameter;
import com.easy2manage.backend.enums.parameters.StringModifier;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.List;

@Component
public class ParamValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return ParamDto.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        ParamDto dto = (ParamDto) o;

        if (dto.getDashboardId() == null) {
            errors.reject("Dashboard id should not be null.");
            return;
        }

        String paramName = validateParamName(dto, errors);
        if (paramName != null) {
            validateValues(paramName, dto, errors);
        }

        validateModifier(dto, errors);
    }

    private String validateParamName(ParamDto dto, Errors errors) {
        if (dto.getParamName() == null) {
            errors.reject("Parameter name should not be null.");
            return null;
        }

        for (Parameter parameter : Parameter.values()) {
            String paramName = dto.getParamName().toLowerCase();
            if (parameter.getParameterName().equals(paramName)) {
                return paramName;
            }
        }

        errors.reject("Parameter name is invalid.");
        return null;
    }

    private void validateValues(String paramName, ParamDto dto, Errors errors) {
        List<String> dtoParameterValues = dto.getParamValues();
        if (dtoParameterValues == null) {
            errors.reject("Parameter values should not be null.");
            return;
        }

        List<String> parameterValues = Parameter.valueOf(paramName.toUpperCase()).getParameterValues();
        if (parameterValues != null) {
            for (String dtoValue : dtoParameterValues) {
                boolean index = false;
                for (String value : parameterValues) {
                    if (value.equals(dtoValue)) {
                        index = true;
                        break;
                    }
                }

                if (!index) {
                    errors.reject("Parameter values error.");
                    return;
                }
            }
        }
    }

    private void validateModifier(ParamDto dto, Errors errors) {
        String modifier = dto.getModifier();

        if (modifier != null) {
            for (StringModifier value : StringModifier.values()) {
                if (value.name().equalsIgnoreCase(modifier)) {
                    return;
                }
            }

            errors.reject("Invalid modifier.");
        }
    }
}
