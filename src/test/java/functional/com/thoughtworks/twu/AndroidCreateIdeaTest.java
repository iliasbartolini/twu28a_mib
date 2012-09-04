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

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

/**
 */
public class AndroidCreateIdeaTest {

    private WebDriver webDriver;

    @Before
    public void setUp(){
        FirefoxProfile fp = new FirefoxProfile();
        fp.setPreference("general.useragent.override","Mozilla/5.0 (Android; Linux armv7l; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Fennec/2. 0.1");

        webDriver = new FirefoxDriver(fp);
    }

    @Test
    public void shouldDisplayErrorOnEmptyIdea() {
        goToCreateIdeaView();

        WebElement button = webDriver.findElement(By.id("submitBtn"));
        button.click();

        WebElement emptyErrorMessage = webDriver.findElement(By.id("alert-area"));

        assertThat(emptyErrorMessage.getText(), is("Please enter some text."));
    }

    @Test
    public void shouldShowErrorMessageAfterFailedSubmission() throws Exception {
        goToCreateIdeaView();

        WebElement message = webDriver.findElement(By.id("ideaText"));
        message.sendKeys("Functional test idea!");

        WebElement button = webDriver.findElement(By.id("submitBtn"));
        button.click();

        (new WebDriverWait(webDriver, 1)).until(new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(@Nullable WebDriver input) {
                return input.getPageSource().contains("Failed to submit.");
            }
        });

        WebElement submitErrorMessage = webDriver.findElement(By.id("alert-area"));
        assertThat(submitErrorMessage.getText(), is("Failed to submit. Please try again in some time."));
    }

    @Test
    @Ignore("Pending until cross-domain issue is solved")
    public void shouldShowCreatedMessageAfterSubmissionOfIdea() {
        goToCreateIdeaView();

        WebElement message = webDriver.findElement(By.id("ideaText"));
        message.sendKeys("Functional test idea!");

        WebElement button = webDriver.findElement(By.id("submitBtn"));
        button.click();

        WebElement submitSuccessMessage = webDriver.findElement(By.id("alert-area"));

        assertThat(submitSuccessMessage.getText(), is("Your idea has been posted."));
    }


    @After
    public void tearDown(){
        webDriver.close();
    }

    private void goToCreateIdeaView() {
        webDriver.get("http://localhost:9876/mib/index.html#for/mibTest/9");
        webDriver.findElement(By.className("ideaIcon")).click();
    }

}
