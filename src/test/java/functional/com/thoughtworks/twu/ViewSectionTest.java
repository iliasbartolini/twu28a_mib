package functional.com.thoughtworks.twu;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.annotation.Nullable;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
@Ignore("ignored until apache and virtual hosts are setup on CI")
public class ViewSectionTest {
    public static final String BOARD_URL = "http://m.ideaboardz.local/#for/functional_test/4";
    public static final String SECTION_URL = "http://m.ideaboardz.local/#for/functional_test/4/9";
    public static final String SECTION_NAME = "First Section";
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
        firefoxProfile.setPreference(firefoxPreference.getName(), firefoxPreference.getValue());

        webDriver = new FirefoxDriver(firefoxProfile);
    }

    @Test
    public void shouldDisplaySectionNameWhenGoingThroughBoardPage(){
        navigateToSectionPage();

        WebElement sectionHeading = webDriver.findElement(By.id("sectionName"));

        assertEquals(SECTION_NAME, sectionHeading.getText());
    }

    @Test
    public void shouldDisplaySectionNameWhenGoingDirectlyToSectionPage(){
        goDirectlyToSectionPage();

        WebElement sectionHeading = webDriver.findElement(By.id("sectionName"));

        assertEquals(SECTION_NAME, sectionHeading.getText());
    }



    @After
    public void tearDown(){
        webDriver.close();
    }

    private void goDirectlyToSectionPage(){
        webDriver.get(SECTION_URL);
        waitForElement(By.id("sectionName"));
    }

    private void navigateToSectionPage() {
        webDriver.get(BOARD_URL);
        waitForElement(By.id("boardName"));

        webDriver.findElement(By.linkText(SECTION_NAME)).click();
        waitForElement(By.id("sectionName"));
    }

    private void waitForElement(final By elementSelector) {
        waitForCondition(new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(@Nullable WebDriver input) {
                return !input.findElements(elementSelector).isEmpty();
            }
        });
    }

    private void waitForText(final String text) {
        waitForCondition(new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(@Nullable WebDriver input) {
                return input.getPageSource().contains(text);
            }
        });
    }

    private void waitForCondition(ExpectedCondition<Boolean> expectedCondition) {
        (new WebDriverWait(webDriver, TIME_OUT_IN_SECONDS)).until(expectedCondition);
    }


}

