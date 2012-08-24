import org.junit.Test;

import java.io.IOException;

import static junit.framework.Assert.assertEquals;

public class UserTest {


    @Test
    public void shouldCreateAnIdea() throws IOException {
        String url = "http://10.10.15.130:3000";
        SendPostRequestStub sendPostRequestStub = new SendPostRequestStub(url);

        User user = new User(sendPostRequestStub);

        Integer newIdeaID = 39;
        Integer section = 2;
        String message = "message";
        String created_at = "2012/08/24 11:28:02 +0530";
        String updated_at = "2012/08/24 11:28:02 +0530";
        Integer votes_count = 0;

        Idea newIdea = new Idea(newIdeaID, section, message, created_at, updated_at, votes_count);
        assertEquals(newIdea, user.createIdea(section, message));
    }

}
