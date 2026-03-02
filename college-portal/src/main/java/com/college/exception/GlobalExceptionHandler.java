package com.college.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(AttendanceException.class)
	public ResponseEntity<ErrorResponse> handleAttendanceException(AttendanceException ex) {

	    return ResponseEntity
	            .status(ex.getStatus())
	            .body(new ErrorResponse(
	                    ex.getMessage(),
	                    ex.getStatus().value()
	            ));
	}
}