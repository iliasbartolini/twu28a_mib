import org.junit.Test;

import java.io.IOException;

import static junit.framework.Assert.assertEquals;

public class UserTest {


    @Test
    public void shouldCreateAnIdea() throws IOException {
        Integer section = 2;
        String message = "message";
        Idea newIdea = createExpectedIdea(section, message);

        assertEquals(newIdea, new User(new ServerRequestStub()).createIdea(section, message));
    }

    private Idea createExpectedIdea(Integer section, String message) {
        Integer newIdeaID = 39;
        String created_at = "2012/08/24 11:28:02 +0530";
        String updated_at = "2012/08/24 11:28:02 +0530";
        Integer votes_count = 0;

        return new Idea(newIdeaID, section, message, created_at, updated_at, votes_count);
    }

}
