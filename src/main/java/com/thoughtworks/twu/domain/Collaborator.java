package com.thoughtworks.twu.domain;

import com.google.gson.Gson;

import java.io.IOException;

//Job: Understands how to work with an idea
public class Collaborator {

    private ServerRequest serverRequest;

    public Collaborator(ServerRequest serverRequest) {
        this.serverRequest = serverRequest;
    }

    public Idea createIdea(Integer section, String message) throws IOException {

        String command = "/points.json?point[section_id]=" +
                section.toString() +
                "&point[message]=" +
                message;

        String response = serverRequest.post(command, null);

        ResponseData responseData = new Gson().fromJson(response, ResponseData.class);

        return new Idea(responseData);
    }
}
