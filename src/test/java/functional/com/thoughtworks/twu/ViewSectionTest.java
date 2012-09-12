package functional.com.thoughtworks.twu;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.annotation.Nullable;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class ViewSectionTest {
    public static final String SECTION_ID = "1";
    public static final String SECTION_NAME = "Went Well";
    public static final By SECTION_HEADING_SELECTOR = By.id("sectionName");

    private TestHelper testHelper;

    @Before
    public void setUp() {
        testHelper = new TestHelper(FirefoxPreference.ANDROID_FIREFOX_PREFERENCE);
    }

    @Test
    public void shouldDisplaySectionNameWhenGoingThroughBoardPage() {
        navigateToSectionPage();

        WebElement sectionHeading = testHelper.findElement(SECTION_HEADING_SELECTOR);
        assertEquals(SECTION_NAME, sectionHeading.getText());
    }

    @Test
    public void shouldDisplaySectionNameWhenGoingDirectlyToSectionPage() {
        goDirectlyToSectionPage();

        WebElement sectionHeading = testHelper.findElement(SECTION_HEADING_SELECTOR);
        assertEquals(SECTION_NAME, sectionHeading.getText());
    }

    @After
    public void tearDown() {
        testHelper.closeWebDriver();
    }

    private void goDirectlyToSectionPage() {
        testHelper.navigateToSectionView(SECTION_ID);
        testHelper.waitForElement(SECTION_HEADING_SELECTOR);
    }

    private void navigateToSectionPage() {
        testHelper.navigateToMainBoardView();
        testHelper.findElement(By.linkText(SECTION_NAME)).click();
        testHelper.waitForElement(SECTION_HEADING_SELECTOR);
    }

}

