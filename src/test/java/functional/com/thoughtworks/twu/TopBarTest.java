package functional.com.thoughtworks.twu;


import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)

public class TopBarTest {

    private TestHelper testHelper;
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

    public TopBarTest(FirefoxPreference firefoxPreference) {
        this.firefoxPreference = firefoxPreference;
    }

    @Before
    public void setUp() {
        testHelper = new TestHelper(this.firefoxPreference);
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