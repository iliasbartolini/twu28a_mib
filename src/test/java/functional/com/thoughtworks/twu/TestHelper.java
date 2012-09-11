package functional.com.thoughtworks.twu;


import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.annotation.Nullable;
import java.util.Arrays;
import java.util.List;
public class TestHelper
{
    public static final String BOARD_URL = "http://m.qa.ideaboardz.thoughtworks.com/#for/MIBTEST/4";
    public static final int TIME_OUT_IN_SECONDS = 5;
    private WebDriver webDriver;



    public TestHelper(FirefoxPreference firefoxPreference)
    {
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

    public void makeGetRequestForTheBoard()
    {
        webDriver.get(this.BOARD_URL);
    }

    public void clickElement(String idString)
    {
        webDriver.findElement(By.id(idString)).click();
    }



    public String getUrl()
    {
        return webDriver.getCurrentUrl();
    }

    public void closeWebDriver()
    {
        webDriver.close();
    }
}


