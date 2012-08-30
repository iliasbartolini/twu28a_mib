import org.joda.time.DateTime;

/**
 * Created with IntelliJ IDEA.
 * User: nagarajr
 * Date: 30/8/12
 * Time: 11:12 AM
 * To change this template use File | Settings | File Templates.
 */
public class Comment {
    public String createNewComment(String name, String comment, DateTime dateTime) {
        return "{'name':'"+name+"','comment':'"+comment+"','createdAt':'"+dateTime.toString()+"'}";
    }

}
