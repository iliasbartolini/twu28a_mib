package functional.com.thoughtworks.twu;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.annotation.Nullable;

import java.util.LinkedList;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

/**
 */
public class CreateIdeaTest {

    private List<WebDriver> webDrivers;

    @Before
    public void setUp(){
        FirefoxProfile androidProfile = new FirefoxProfile();
        androidProfile.setPreference("general.useragent.override", "Mozilla/5.0 (Android; Linux armv7l; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Fennec/2. 0.1");
        WebDriver androidDriver = new FirefoxDriver(androidProfile);

        FirefoxProfile iosProfile = new FirefoxProfile();
        iosProfile.setPreference("general.useragent.override","Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; da-dk) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5");
        WebDriver iosDriver = new FirefoxDriver(iosProfile);

        webDrivers = new LinkedList<WebDriver>();
        webDrivers.add(androidDriver);
        webDrivers.add(iosDriver);
    }

    @Test
    public void shouldDisplayErrorOnEmptyIdea() {
        for (WebDriver wd: webDrivers){
            navigateToCreateIdeaView(wd);

            submitIdea(wd);

            assertDisplayedMessageIs("Please enter some text.", wd);
        }
    }

    @Test
    public void shouldShowErrorMessageAfterFailedSubmission() throws Exception {
        for (WebDriver wd: webDrivers){
            navigateToCreateIdeaView(wd);

            addIdeaText("Functional test idea!", wd);

            submitIdea(wd);

            assertDisplayedMessageIs("Failed to submit. Please try again in some time.", wd);
        }
    }

    @Test
    @Ignore("Pending until cross-domain issue is solved")
    public void shouldShowCreatedMessageAfterSubmissionOfIdea() {
        for (WebDriver wd: webDrivers){
            navigateToCreateIdeaView(wd);

            addIdeaText("Functional test idea!", wd);

            submitIdea(wd);

            assertDisplayedMessageIs("Your idea has been posted.", wd);
        }
    }

    @After
    public void tearDown(){
        for (WebDriver webDriver : webDrivers){
            webDriver.close();
        }
    }

    private void navigateToCreateIdeaView(WebDriver webDriver) {
        webDriver.get("http://localhost:9876/mib/index.html#for/mibTest/9");
        webDriver.findElement(By.className("ideaIcon")).click();
    }

    private void submitIdea(WebDriver webDriver) {
        WebElement button = webDriver.findElement(By.id("submitBtn"));
        button.click();
    }

    private void addIdeaText(String ideaText, WebDriver webDriver) {
        WebElement message = webDriver.findElement(By.id("ideaText"));
        message.sendKeys(ideaText);
    }

    private void waitForEltWithText(final String toCheckFor, WebDriver webDriver) {
        (new WebDriverWait(webDriver, 1)).until(new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(@Nullable WebDriver input) {
                return input.getPageSource().contains(toCheckFor);
            }
        });
    }

    private void assertDisplayedMessageIs(String message, WebDriver webDriver) {
        waitForEltWithText(message, webDriver);

        WebElement alertArea = webDriver.findElement(By.id("alert-area"));
        assertThat(alertArea.getText(), is(message));
    }

}
