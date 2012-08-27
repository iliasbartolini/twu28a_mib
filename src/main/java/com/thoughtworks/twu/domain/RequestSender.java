package com.thoughtworks.twu.domain;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;

public class RequestSender implements ServerRequest {

    private String url;

    public RequestSender(String url) {
        this.url = url;
    }

    @Override
    public String post(String command, String data) throws IOException {
        URL postUrl = new URL(url + command);

        URLConnection conn = postUrl.openConnection();
        conn.setDoOutput(true);
        OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
        if(data != null) {
            writer.write(data);
            writer.flush();
        }

        // Get the response
        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        String response = "";
        while ((line = reader.readLine()) != null) {
            response += line;
        }

        return response;
    }
}
