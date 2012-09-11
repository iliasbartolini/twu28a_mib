package functional.com.thoughtworks.twu;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.annotation.Nullable;

import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

public class TestHelper {
    public static final String BOARD_URL = "http://m.ideaboardz.local/#for/test/1";
    public static final int TIME_OUT_IN_SECONDS = 15;
    public static final String BOARD_NAME = "test";

    private WebDriver webDriver;


    public TestHelper(FirefoxPreference firefoxPreference) {
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        firefoxProfile.setPreference(firefoxPreference.getName(), firefoxPreference.getValue());
        this.webDriver = new FirefoxDriver(firefoxProfile);

    }

    public void waitForElement(final By elementSelector) {
        waitForCondition(new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(@Nullable WebDriver input) {
                return !input.findElements(elementSelector).isEmpty();
            }
        });
    }

    public void waitForCondition(ExpectedCondition<Boolean> expectedCondition) {
        (new WebDriverWait(webDriver, TIME_OUT_IN_SECONDS)).until(expectedCondition);
    }

    public void navigateToUrl(String boardUrl) {
        webDriver.get(boardUrl);
    }

    public void clickElement(By selector) {
        webDriver.findElement(selector).click();
    }

    public WebElement findElement(By selector) {
        return webDriver.findElement(selector);
    }

    public void navigateToCreateIdeaView() {
        navigateToMainBoardView();

        By createIdeaButton = By.id("createIdeaBtn");
        waitForElement(createIdeaButton);
        clickElement(createIdeaButton);

        waitForElement(By.id("ideaText"));
    }

    public void navigateToMainBoardView() {
        navigateToUrl(BOARD_URL);
        waitForElement(By.id("boardName"));
    }

    public void navigateToSectionView(String sectionId) {
        navigateToUrl(BOARD_URL + "/" + sectionId);
        waitForElement(By.id("sectionName"));
    }

    public void navigateToCommentView() {
        navigateToMainBoardView();
        By commentButton = By.id("commentBtn");
        waitForElement(commentButton);
        findElement(commentButton).click();
    }

    public String getCurrentUrl() {
        return webDriver.getCurrentUrl();
    }

    public void closeWebDriver() {
        webDriver.close();
    }

    public void assertDisplayedMessageIs(String message) {
        By alertAreaSelector = By.id("alert-area");
        waitForElement(alertAreaSelector);
        waitForText(message);
        WebElement alertArea = webDriver.findElement(alertAreaSelector);
        assertThat(alertArea.getText(), is(message));
    }

    private void waitForText(final String text) {
        waitForCondition(new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(@Nullable WebDriver input) {
                return input.getPageSource().contains(text);
            }
        });
    }

    public WebElement findElementByTagName(String tagName) {
        return webDriver.findElement(By.tagName(tagName));
    }

    List<WebElement> findElements() {
        return webDriver.findElements(By.cssSelector("#sectionsList li a"));
    }

    public boolean contains(String string) {
        return webDriver.getPageSource().contains(string);
    }
}



