import com.google.gson.Gson;
import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class SendPostRequestTest {
    @Test
    public void shouldSendACreatePostRequestToServer() throws Exception {
        Integer section = 4;
        String message = "Vishnu";

        String url = "http://10.10.15.130:3000";
        SendPostRequest sendPostRequest = new SendPostRequest(url);
        String command = "/points.json?point[section_id]=" +
                section.toString() +
                "&point[message]=" +
                message;
        String data = null;
        String response = sendPostRequest.post(command, data);

        ResponseData responseData = new Gson().fromJson(response, ResponseData.class);

        assertEquals(message, responseData.getMessage());
    }
}
