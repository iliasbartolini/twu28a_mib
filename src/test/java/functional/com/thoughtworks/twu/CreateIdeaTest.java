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

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;

@RunWith(Parameterized.class)
//@Ignore("ignored until apache and virtual hosts are setup on CI")
public class CreateIdeaTest {

    private FirefoxPreference firefoxPreference;
    private TestHelper testHelper;


    @Parameterized.Parameters
    public static List<Object[]> firefoxPreferences() {
        return Arrays.asList(
                new Object[][] {
                        { new FirefoxPreference("general.useragent.override", "Mozilla/5.0 (Android; Linux armv7l; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Fennec/2.0.1") },
                        { new FirefoxPreference("general.useragent.override", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; da-dk) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5") }
                }
        );
    }

    public CreateIdeaTest(FirefoxPreference firefoxPreference) {
        this.firefoxPreference = firefoxPreference;
    }

    @Before
    public void setUp(){
        testHelper=new TestHelper(this.firefoxPreference);

    }





    @Test
    public void shouldDisplayErrorOnEmptyIdea() {
        testHelper.navigateToCreateIdeaView();

        submitIdea();

        testHelper.assertDisplayedMessageIs("Please enter some text.");


    }

    @Test
    public void shouldShowCreatedMessageAfterSubmissionOfIdea() {
        testHelper.navigateToCreateIdeaView();

        testHelper.waitForElement(By.id("ideaText"));


        addIdeaText("Functional test idea!");

        testHelper.waitForElement(By.id("submitBtn"));

        submitIdea();

        testHelper.waitForElement(By.id("alert-area"));

        testHelper.assertDisplayedMessageIs("Your idea has been posted.");
    }

    @Test
    public void shouldRemainOnCreateIdeaPageAfterSubmitting()
    {

        testHelper.navigateToCreateIdeaView();
        submitIdea();


        String currentUrl= testHelper.getUrl();

        assertEquals(testHelper.BOARD_URL + "/createIdea", currentUrl);
    }

    @Test
    public void shouldSeeContributIdeaPageWithCorrectBoardName()
    {
        testHelper.navigateToCreateIdeaView();
        testHelper.waitForElement(By.id("boardName"));

        WebElement boardName = testHelper.findElement("boardName");

        assertEquals("MIBTEST", boardName.getText());

    }



//    @After
//    public void tearDown()
//    {
//        testHelper.closeWebDriver();
//    }

    private void addIdeaText(String ideaText) {

        WebElement message =testHelper.findElement("ideaText");
        message.sendKeys(ideaText);
    }

    public void submitIdea() {
        WebElement button = testHelper.findElement("submitBtn");
        button.click();
    }
    /*
    @Test
    @Ignore("ignored because we cannot control making the IdeaBoardz app fail")
    public void shouldShowErrorMessageAfterFailedSubmission() throws Exception {
        navigateToCreateIdeaView();

        addIdeaText("Functional test idea!");

        submitIdea();

        assertDisplayedMessageIs("Failed to submit. Please try again in some time.");
    }



    @After
    public void tearDown(){
        webDriver.close();
    }









    private void waitForElement(final By elementSelector) {
        waitForCondition(new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(@Nullable WebDriver input) {
                return !input.findElements(elementSelector).isEmpty();
            }
        });
    }



    private void waitForCondition(ExpectedCondition<Boolean> expectedCondition) {
        (new WebDriverWait(webDriver, TIME_OUT_IN_SECONDS)).until(expectedCondition);
    }
    */


}
