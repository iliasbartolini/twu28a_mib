package functional.com.thoughtworks.twu;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.annotation.Nullable;

import static org.junit.Assert.assertThat;
import static org.junit.matchers.JUnitMatchers.containsString;

public class TestHelper {
    public static final String BOARD_URL = "http://m.qa.ideaboardz.thoughtworks.com/#for/MIBTEST/4";
    public static final int TIME_OUT_IN_SECONDS = 5;
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

    public void makeGetRequestForTheBoard() {
        webDriver.get(this.BOARD_URL);
    }

    public void clickElement(String idString) {
        webDriver.findElement(By.id(idString)).click();
    }

    public WebElement findElement(String idString) {
        return webDriver.findElement(By.id(idString));

    }

    public void navigateToCreateIdeaView() {
        this.makeGetRequestForTheBoard();
        By createIdeaButtonSelector = By.id("createIdeaBtn");

        this.waitForElement(createIdeaButtonSelector);

        this.clickElement("createIdeaBtn");
    }

    public String getUrl() {
        return webDriver.getCurrentUrl();
    }

    public void closeWebDriver() {
        webDriver.close();
    }

    public void navigateToView(String boardUrl) {
        webDriver.get(boardUrl);
    }

    public void assertDisplayedMessageIs(String message) {
        assertContent("alert-area", message);
    }

    public void assertContent(String id, String message) {
        By alertAreaSelector = By.id(id);
        waitForText(message);
        WebElement alertArea = webDriver.findElement(alertAreaSelector);
        assertThat(alertArea.getText(), containsString(message));
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

    public void addText(String elementId, String ideaText) {
        WebElement message = findElement(elementId);
        message.sendKeys(ideaText);
    }

    public void refreshWebPage() {
        webDriver.navigate().refresh();
    }

}



