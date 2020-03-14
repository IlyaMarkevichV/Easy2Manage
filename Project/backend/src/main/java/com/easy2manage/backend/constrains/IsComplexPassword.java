package com.easy2manage.backend.constrains;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = IsComplexPasswordValidator.class)
@Documented
public @interface IsComplexPassword {
    String message() default "Too easy password";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
