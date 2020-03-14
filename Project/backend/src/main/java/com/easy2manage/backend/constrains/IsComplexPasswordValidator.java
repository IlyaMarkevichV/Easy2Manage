package com.easy2manage.backend.constrains;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class IsComplexPasswordValidator implements ConstraintValidator<IsComplexPassword, String> {

    @Override
    public void initialize(final IsComplexPassword constraintAnnotation) {

    }

    @Override
    public boolean isValid(final String password, final ConstraintValidatorContext constraintValidatorContext) {
        if (password.length() < 10) {
            return false;
        }
        char[] chars = password.toCharArray();

        return checkUpperCase(chars) && checkLowerCase(chars) && checkDigit(chars);
    }

    private boolean checkUpperCase(char[] chars) {
        for (char symbol : chars) {
            if (symbol >= 'A' && symbol <= 'Z') {
                return true;
            }
        }

        return false;
    }

    private boolean checkLowerCase(char[] chars) {
        for (char symbol : chars) {
            if (symbol >= 'a' && symbol <= 'z') {
                return true;
            }
        }

        return false;
    }

    private boolean checkDigit(char[] chars) {
        for (char symbol : chars) {
            if (symbol >= '0' && symbol <= '9') {
                return true;
            }
        }

        return false;
    }
}
