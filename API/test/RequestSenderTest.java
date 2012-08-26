import com.google.gson.Gson;
import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class RequestSenderTest {
    @Test
    public void shouldSendACreatePostRequestToServer() throws Exception {
        Integer section = 3;
        String message = "Vishnufff";

        String url = "http://10.10.15.130:3000";
        RequestSender requestSender = new RequestSender(url);
        String command = "/points.json?point[section_id]=" +
                section.toString() +
                "&point[message]=" +
                message;
        String data = null;
        String response = requestSender.post(command, data);

        ResponseData responseData = new Gson().fromJson(response, ResponseData.class);

        assertEquals(message, responseData.getMessage());
        assertEquals((Integer)0, responseData.getVotes_count());
    }
}
