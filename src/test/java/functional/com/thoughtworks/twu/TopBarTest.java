package functional.com.thoughtworks.twu;


import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class TopBarTest {

    private TestHelper testHelper;

    @Before
    public void setUp() {
        testHelper = new TestHelper(FirefoxPreference.ANDROID_FIREFOX_PREFERENCE);
    }

    @Test
    public void shouldNavigateToCreateIdeaView() {
        testHelper.navigateToCreateIdeaView();

        String currentUrl = testHelper.getCurrentUrl();

        assertEquals(testHelper.BOARD_URL + "/createIdea", currentUrl);
    }

    @After
    public void tearDown() {
        testHelper.closeWebDriver();
    }

}