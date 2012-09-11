package functional.com.thoughtworks.twu;

/**
 * Created with IntelliJ IDEA.
 * User: ankit
 * Date: 10/9/12
 * Time: 4:49 PM
 * To change this template use File | Settings | File Templates.
 */
public class FirefoxPreference
{

        private String name;
        private String value;

    public String getValue()
    {
        return value;
    }

    public String getName()
    {
        return name;
    }

    public FirefoxPreference(String name, String value) {
            this.name = name;
            this.value = value;
        }
}
