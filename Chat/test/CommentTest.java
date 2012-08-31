import org.joda.time.DateTime;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

public class CommentTest {
    @Test
    public void shouldReturnTheCreatedRow(){
        Comment comment = new Comment();
        DateTime dateTime = new DateTime();
        String actual = comment.createNewComment("anoop","hello naga",dateTime);
        String expected = "{'name':'anoop','comment':'hello naga','createdAt':'"+dateTime.toString()+"'}";
        assertEquals(expected,actual);

    }

    @Test
    public void shouldReturnTheCreatedRowForDifferentComments(){
        Comment comment = new Comment();
        DateTime dateTime = new DateTime();
        String actual = comment.createNewComment("naga","hi.. anoop",dateTime);
        String expected = "{'name':'naga','comment':'hi.. anoop','createdAt':'"+dateTime.toString()+"'}";
        assertEquals(expected,actual);

    }

    @Test
    public void shouldConnectToDataBase(){


    }

}
