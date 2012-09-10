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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
@Ignore("ignored until apache and virtual hosts are setup on CI")
public class ViewIdeaboardzTest {
    public static final String BOARD_URL = "http://m.ideaboardz.local/#for/test/1";
    public static final String BOARD_NAME = "test";
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

    public ViewIdeaboardzTest(FirefoxPreference firefoxPreference) {
        this.firefoxPreference = firefoxPreference;
    }

    @Before
    public void setUp(){
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        firefoxProfile.setPreference(firefoxPreference.name, firefoxPreference.value);

        webDriver = new FirefoxDriver(firefoxProfile);

    }

    @Test
    public void shouldDisplayNamesOfAllSections(){
        List<String> sectionNameList = new ArrayList<String>();
        sectionNameList.add("What went well");
        sectionNameList.add("What can be improved");
        sectionNameList.add("Action Items");

        navigateToMainBoardPage();

        List<WebElement> sectionItems = webDriver.findElements(By.cssSelector("#sectionsList li a"));

        assertSectionNamesDisplayedAre(sectionNameList, sectionItems);

    }

    @Test
    public void shouldDisplayBoardName(){
        navigateToMainBoardPage();

        WebElement heading = webDriver.findElement(By.id("boardName"));

        assertEquals(BOARD_NAME, heading.getText());
    }

    @Test
    public void shouldCustomizeMenuLinksAccordingToTheBoardURL(){
        List<String> menuLinks = new ArrayList<String>();
        menuLinks.add(BOARD_URL);
        menuLinks.add(BOARD_URL + "/comment");
        menuLinks.add(BOARD_URL + "/createIdea");
        navigateToMainBoardPage();

        List<WebElement> menuIcons = new ArrayList<WebElement>();
        menuIcons.add(webDriver.findElement(By.id("logo")));
        menuIcons.add(webDriver.findElement(By.id("commentBtn")));
        menuIcons.add(webDriver.findElement(By.id("createIdeaBtn")));
        assertMenuLinkCustomization(menuLinks, menuIcons);
    }

    private void assertMenuLinkCustomization(List<String> menuLinks, List<WebElement> menuIcons) {
        int index = 0;
        for(WebElement element:menuIcons){
            assertEquals(menuLinks.get(index), element.getAttribute("href"));
            index++;
        }
    }

    private void assertSectionNamesDisplayedAre(List<String> expected, List<WebElement> actual) {
        int index = 0;
        for(WebElement element:actual){
            assertEquals(expected.get(index), element.getText());
            index++;
        }

    }

    @After
    public void tearDown(){
        webDriver.close();
    }

    private void navigateToMainBoardPage() {
        webDriver.get(BOARD_URL);
        try{
        waitForBoardNameToAppear(webDriver);
        }
        catch(Exception e){
            System.out.println("Timeout for Board Name to appear on screen");
        }
    }

    private static class FirefoxPreference {
        private String name;
        private String value;

        private FirefoxPreference(String name, String value) {
            this.name = name;
            this.value = value;
        }
    }



    public void waitForBoardNameToAppear(WebDriver driver) throws Exception {
        for (int second = 0;; second++) {
            if (second >= 30) break;
            try {
                if (isElementActive(By.id("boardName"), driver))
                    break;
            } catch (Exception e) {}
            Thread.sleep(1000);
        }
    }

    private boolean isElementActive(By id, WebDriver driver) {
        WebElement we =  driver.findElement(id);
        if(we.isEnabled())
            return true;
        return false;
    }
}