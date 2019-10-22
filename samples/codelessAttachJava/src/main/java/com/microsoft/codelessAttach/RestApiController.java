package com.microsoft.codelessAttach;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

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

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<String> getMethod(@RequestBody String json) {
        try {
            
            JSONObject parsedJson = new JSONObject(json);

            if (parsedJson.has("DelayMs")) {
                System.out.printf("\n delay %d", parsedJson.getLong("DelayMs"));
                Thread.sleep(parsedJson.getLong("DelayMs"));
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
                        System.out.printf("\n calling uri %s", uri);
                        this.HttpRequest(uri);
                        System.out.printf("\n done calling uri %s", uri);
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