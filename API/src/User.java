import com.google.gson.Gson;

import java.io.IOException;

//Job: Understands how to work with an idea
public class User {

    private SendRequest sendRequest;

    public User(SendRequest sendRequest) {
        this.sendRequest=sendRequest;
    }

    public Idea createIdea(Integer section, String message) throws IOException {
        String command = "/points.json?point[section_id]=" +
                section.toString() +
                "&point[message]=" +
                message;
        String data = null;

        String response = sendRequest.post(command, data);

        ResponseData responseData = new Gson().fromJson(response, ResponseData.class);

        Idea newIdea = new Idea(responseData);

        return newIdea;
    }
}
