package functional.com.thoughtworks.twu;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.android.AndroidDriver;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

/**
 */
public class AndroidCreateIdeaTest {

    private WebDriver webDriver;

    @Before
    public void setUp(){
        webDriver = new AndroidDriver();
    }

    @Test
    public void shouldDisplayBoardNameOnCreateIdeaPage() {
        webDriver.get("http://localhost:9876/mib/createIdea");
        WebElement header = webDriver.findElement(By.className("mib_header"));

        assertThat(header.getText(), is("New Idea"));
    }

    /*
    @Test
    public void shouldShowCreatedMessageAfterSubmissionOfIdea() {
        webDriver.get("http://localhost:9876/mib/createIdea");

        WebElement message = webDriver.findElement(By.id("ideaText"));
        message.sendKeys("Functional test idea!");

        message.submit();

        WebElement alert = webDriver.findElement(By.className("alert alert-success"));

        assertThat(alert.getText(), is("Your idea has been posted"));

    } */

}
