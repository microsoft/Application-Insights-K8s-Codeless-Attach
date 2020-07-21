package com.microsoft.applicationinsights;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.instrument.*;

/**
 * Hello world!
 *
 */
public class App {
    private static Process process;
    private static String path = "/agentfiles/telemetry/logsuploader/logsuploader";

    public static void premain(String agentArgs, Instrumentation inst) {
        System.out.println("Started the second agent because why not!");
        System.out.println("Start process " + path + " success " + processStarter(path));
    }

    public static void main(String[] args) {
        System.out.println("Hello Worldfrom second agent!");
        processStarter("D:\\src\\Application-Insights-K8s-Codeless-Attach\\agents\\logsuploader\\logsuploader.exe");
    }

    public static Boolean processStarter(String path) {
        Boolean returnValue = false;
        try {
            process = new ProcessBuilder(path).start();
            try (BufferedReader input = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;

                while ((line = input.readLine()) != null) {
                    System.out.println(line);
                    if (line.startsWith("Done starting")) {
                        break;
                    }
                }
            }
            returnValue = true;
        } catch (IOException e) {

            e.printStackTrace();
        }
        return returnValue;
    }
}
