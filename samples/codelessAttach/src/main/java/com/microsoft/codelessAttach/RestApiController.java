package com.microsoft.codelessAttach;

import java.net.*;
import java.io.*;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RestApiController {

    public static final Logger logger = LoggerFactory.getLogger(RestApiController.class);

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<String> getMethod(@RequestBody String json) {
        try {
            
            JSONObject parsedJson = new JSONObject(json);

            if (parsedJson.has("Delay")) {
                Thread.sleep(parsedJson.getLong("Delay"));
            }

            if(parsedJson.has("FailureChance")){
                if(parsedJson.getDouble("FailureChance") > Math.random()){
                    throw new Exception("Failure");
                }
            }

            if(parsedJson.has("SubsequentCalls")){
                JSONArray calls = parsedJson.getJSONArray("SubsequentCalls");
                for(int i =0; i< calls.length(); i++){
                    String uri = calls.getJSONObject(i).getString("Uri");
                    if(uri.startsWith("http")){
                        this.HttpRequest(uri);
                    }
                }
            }

            return new ResponseEntity<String>(HttpStatus.OK);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private  void HttpRequest(String uri) throws Exception {
        URL url = new URL(uri);
        URLConnection uc = url.openConnection();
        BufferedReader in = new BufferedReader(
                                new InputStreamReader(
                                uc.getInputStream()));
        String inputLine;

        while ((inputLine = in.readLine()) != null) ;
            
        in.close();
    }
}