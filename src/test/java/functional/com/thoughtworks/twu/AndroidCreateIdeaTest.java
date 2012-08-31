package functional.com.thoughtworks.twu;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

/**
 */
public class AndroidCreateIdeaTest {

    private WebDriver webDriver;

    //@Before
    public void setUp(){
        FirefoxProfile fp = new FirefoxProfile();
        fp.setPreference("general.useragent.override","Mozilla/5.0 (Android; Linux armv7l; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Fennec/2.0.1");

        webDriver = new FirefoxDriver(fp);
    }

    //@Test
    public void shouldDisplayBoardNameOnCreateIdeaPage() {
        webDriver.get("http://localhost:9876/mib/deprecated/createIdea");
        WebElement header = webDriver.findElement(By.className("mib_header"));

        assertThat(header.getText(), is("New Idea"));
    }


    //@Test
    public void shouldDisplaySubmitButtonOnCreateIdeaPage() {
        webDriver.get("http://localhost:9876/mib/deprecated/createIdea");
        WebElement button = webDriver.findElement(By.id("submitBtn"));

        assertThat(button.getText(), is("Submit Idea"));
    }

    //@Test
    public void shouldShowCreatedMessageAfterSubmissionOfIdea() {
        webDriver.get("http://localhost:9876/mib/deprecated/createIdea");

        WebElement message = webDriver.findElement(By.id("ideaText"));
        message.sendKeys("Functional test idea!");

        message.submit();

        WebElement alert = webDriver.findElement(By.id("alertSuccess"));

        assertThat(alert.getText(), is("Your idea has been posted"));

    }

    //@Test
    public void shouldShowEmptyIdeaMessageAfterSubmissionOfEmptyIdea() {
        webDriver.get("http://localhost:9876/mib/deprecated/createIdea");

        WebElement message = webDriver.findElement(By.id("ideaText"));

        message.submit();

        WebElement alert = webDriver.findElement(By.id("alertError"));

        assertThat(alert.getText(), is("Your idea is empty"));

    }

    @After
    public void tearDown(){
        webDriver.close();
    }

}
