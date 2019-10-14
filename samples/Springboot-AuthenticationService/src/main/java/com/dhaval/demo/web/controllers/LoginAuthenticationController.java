package com.dhaval.demo.web.controllers;

import com.dhaval.demo.domain.User;
import com.dhaval.demo.repository.UserRepository;
import com.microsoft.applicationinsights.TelemetryClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
public class LoginAuthenticationController {

   @Autowired
   TelemetryClient telemetryClient;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/login")
    @ResponseStatus
    public ResponseEntity authenticateUser(@RequestParam String userName, @RequestParam String password) {
        if ((userName == null || userName.isEmpty()) || (password == null || password.isEmpty())) {
            throw new IllegalArgumentException("User name or password cannot be null or empty");
        }
        User user = userRepository.findByName(userName);
        if (user != null && user.getPassword().equals(password)) {
            telemetryClient.trackTrace("User is authenticated");
            return new ResponseEntity(HttpStatus.valueOf(200));
        }
        else {
            telemetryClient.trackTrace("Illegal userName or Password");
            return new ResponseEntity(HttpStatus.valueOf(400));
        }
    }
}
