import com.google.gson.Gson;

import java.io.IOException;

//Job: Understands how to work with an idea
public class User {

    private ServerRequest serverRequest;

    public User(ServerRequest serverRequest) {
        this.serverRequest = serverRequest;
    }

    public Idea createIdea(Integer section, String message) throws IOException {
        String command = String.format("/points.json?point[section_id]=%s&point[message]=%s", section.toString(), message);

        String response = serverRequest.post(command, null);

        ResponseData responseData = new Gson().fromJson(response, ResponseData.class);

        return new Idea(responseData);
    }
}
