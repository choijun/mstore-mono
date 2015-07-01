package vn.kms.mstore.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import vn.kms.mstore.util.DataInvalidException;
import vn.kms.mstore.util.DataNotFoundException;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

/**
 * Created by trungnguyen on 6/24/15.
 */
@Slf4j
public class BaseRest {
    @ExceptionHandler(DataInvalidException.class)
    @ResponseStatus(value = BAD_REQUEST)
    @ResponseBody
    public Object handleDataInvalidException(DataInvalidException ex) {
        return buildError(ex, false);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(value = BAD_REQUEST)
    @ResponseBody
    public Object handleValidationException(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();

        Map<String, String> errors = result.getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));

        return errors;
    }

    @ExceptionHandler(DataNotFoundException.class)
    @ResponseStatus(value = NOT_FOUND)
    @ResponseBody
    public Object handleDataNotFoundException(DataNotFoundException ex) {
        return buildError(ex, false);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Object handleGeneralException(Exception ex) {
        return buildError(ex, true);
    }

    private Map<String, Object> buildError(Exception ex, boolean trackError) {
        Map<String, Object> error = new HashMap<>();
        error.put("message", ex.getMessage());

        if (trackError) {
            error.put("trace", ex.getStackTrace()[0]);
            log.error(ex.getClass().getName(), ex);
        }

        return error;
    }
}
