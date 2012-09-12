package functional.com.thoughtworks.twu;


public class FirefoxPreference {

    private String name;
    private String value;

    public String getValue() {
        return value;
    }

    public String getName() {
        return name;
    }

    public FirefoxPreference(String name, String value) {
        this.name = name;
        this.value = value;
    }
}
