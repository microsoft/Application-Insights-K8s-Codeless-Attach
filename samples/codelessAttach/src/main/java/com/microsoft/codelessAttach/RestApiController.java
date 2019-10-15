package com.microsoft.codelessAttach;

import java.util.List;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
@RequestMapping("/")
public class RestApiController {
 
    public static final Logger logger = LoggerFactory.getLogger(RestApiController.class);
 
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<String> getMethod(){
        return new ResponseEntity<String>(HttpStatus.OK);
    }
 
    
}