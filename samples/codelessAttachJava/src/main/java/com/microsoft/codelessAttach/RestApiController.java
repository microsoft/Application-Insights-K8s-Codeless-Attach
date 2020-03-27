package com.microsoft.codelessAttach;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

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
    private static Random rand;
    public static final Logger logger = LoggerFactory.getLogger(RestApiController.class);

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<HttpStatus> postMethod(@RequestBody String json) throws Exception {
        HttpStatus status = HttpStatus.OK;
            if(rand == null){
                rand = new Random();
            }

            JSONObject parsedJson = new JSONObject(json);

            if (parsedJson.has("DelayMs")) {
                System.out.printf("\n delay %d", parsedJson.getLong("DelayMs"));
                Thread.sleep(parsedJson.getLong("DelayMs"));
            }

            if (parsedJson.has("FailureChance")) {
                if (parsedJson.getDouble("FailureChance") > rand.nextDouble()) {
                    if(rand.nextDouble() < 0.3){
                    throw new Exception("Failure");
                    }
                    else if(rand.nextDouble() < 0.6){
                        throw new NumberFormatException("number exception");
                    }else {
                        throw new NullPointerException("log Exception");
                    }
                }
            }

            if (parsedJson.has("SubsequentCalls")) {
                JSONArray calls = parsedJson.getJSONArray("SubsequentCalls");
                for (int i = 0; i < calls.length(); i++) {
                    String uri = calls.getJSONObject(i).getString("Uri");
                    if (uri.startsWith("http")) {
                        System.out.printf("\n calling uri %s", uri);
                        HttpStatus result = this.HttpRequest(uri);

                        if(result!= HttpStatus.OK){
                            status = result;
                        }
                        
                        System.out.printf("\n done calling uri %s ", uri, result.toString());
                    }
                }
            }

        return new ResponseEntity<HttpStatus>(status);
    }

    private boolean shouldRun = false;

    @RequestMapping(value = "/spike", method = RequestMethod.GET)
    public ResponseEntity<HttpStatus> getMethod() {
        
        shouldRun = true;
        Timer timer = new Timer();
        Lock lock = new ReentrantLock();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                lock.lock();
                 shouldRun= false;
                lock.unlock();
            }
        }, 10 * 1000);
        
        Thread thread = new Thread() {
            public void run() {
                boolean running = true;
                while (running) {
                    lock.lock();
                    running= shouldRun;
                    lock.unlock();
                }
            }
        };

        thread.run();
        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.REQUEST_TIMEOUT);
    }

    private HttpStatus HttpRequest(String uri) throws Exception {
        URL url = new URL(uri);
        HttpURLConnection uc = (HttpURLConnection)url.openConnection();
        return HttpStatus.resolve(uc.getResponseCode());
    }
}