package functional.com.thoughtworks.twu;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
//@Ignore("ignored until apache and virtual hosts are setup on CI")
public class ViewSectionTest {
    public static final String SECTION_URL = "http://m.ideaboardz.local/#for/Test/2/4/";
    public static final String SECTION_NAME = "What can be improved";
    public static final int TIME_OUT_IN_SECONDS = 1000;

    private WebDriver webDriver;
    private FirefoxPreference firefoxPreference;

    @Parameterized.Parameters
    public static List<Object[]> firefoxPreferences() {
        return Arrays.asList(
                new Object[][]{
                        {new FirefoxPreference("general.useragent.override", "Mozilla/5.0 (Android; Linux armv7l; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Fennec/2.0.1")},
                        {new FirefoxPreference("general.useragent.override", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; da-dk) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5")}
                }
        );
    }

    public ViewSectionTest(FirefoxPreference firefoxPreference) {
        this.firefoxPreference = firefoxPreference;
    }

    @Before
    public void setUp(){
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        firefoxProfile.setPreference(firefoxPreference.name, firefoxPreference.value);

        webDriver = new FirefoxDriver(firefoxProfile);

    }

    @Test
    public void shouldDisplaySectionName(){
        navigateToSectionPage();

        WebElement sectionHeading = webDriver.findElement(By.id("sectionName"));

        assertEquals(SECTION_NAME, sectionHeading.getText());

    }

    @After
    public void tearDown(){
        webDriver.close();
    }

    private void navigateToSectionPage() {
        webDriver.get(SECTION_URL);
        try{
            waitForSectionNameToAppear(webDriver);
        }
        catch(Exception e){
            System.out.println("Timeout for Board Name to appear on screen");
        }
    }

    private static class FirefoxPreference {
        private String name;
        private String value;

        private FirefoxPreference(String name, String value) {
            this.name = name;
            this.value = value;
        }
    }



    public void waitForSectionNameToAppear(WebDriver driver) throws Exception {
        for (int second = 0;; second++) {
            if (second >= 30) break;
            try {
                if (isElementActive(By.id("sectionName"), driver))
                    break;
            } catch (Exception e) {}
            Thread.sleep(1000);
        }
    }

    private boolean isElementActive(By id, WebDriver driver) {
        WebElement we =  driver.findElement(id);
        if(we.isEnabled())
            return true;
        return false;
    }
}

