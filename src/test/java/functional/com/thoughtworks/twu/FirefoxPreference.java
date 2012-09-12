package functional.com.thoughtworks.twu;


public class FirefoxPreference {

    public static final FirefoxPreference ANDROID_FIREFOX_PREFERENCE = new FirefoxPreference("general.useragent.override", "Mozilla/5.0 (Android; Linux armv7l; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Fennec/2.0.1");
    public static final FirefoxPreference IOS_FIREFOX_PREFERENCE = new FirefoxPreference("general.useragent.override", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; da-dk) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5");
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
