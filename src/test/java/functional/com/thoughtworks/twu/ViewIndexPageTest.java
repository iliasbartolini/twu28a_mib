package functional.com.thoughtworks.twu;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.List;

import static org.junit.Assert.assertTrue;

@RunWith(Parameterized.class)
public class ViewIndexPageTest {

    private FirefoxPreference firefoxPreference;
    private TestHelper testHelper;


    @Parameterized.Parameters
    public static List<Object[]> firefoxPreferences() {
        return TestHelper.getFirefoxPreferences();
    }

    public ViewIndexPageTest(FirefoxPreference firefoxPreference) {
        this.firefoxPreference = firefoxPreference;
    }

    @Before
    public void setUp() {
        testHelper = new TestHelper(this.firefoxPreference);
    }

    @Test
    public void shouldShowWelcomeMessageInIndexPage(){
        testHelper.navigateToUrl(TestHelper.DOMAIN);
    }

    @Test
    public void shouldShowErrorMessageForInvalidURL(){
        testHelper.navigateToUrl("http://m.ideaboardz.local/#for");
        assertTrue(testHelper.contains("No such page exists"));
    }

    @Test
    public void shouldShowErrorMessageForInvalidURLWithMoreParam(){
        testHelper.navigateToUrl("http://m.ideaboardz.local/#for/test/1" + "/someRandomPage");
        assertTrue(testHelper.contains("No such page exists"));
    }

    @After
    public void tearDown() {
        testHelper.closeWebDriver();
    }
}
