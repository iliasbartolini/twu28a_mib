package functional.com.thoughtworks.twu;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.By;

import java.util.Arrays;
import java.util.List;

@RunWith(Parameterized.class)
public class PostCommentTest {
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

    @Before
    public void setUp(){
        testHelper=new TestHelper(this.firefoxPreference);
    }

    public PostCommentTest(FirefoxPreference firefoxPreference) {
        this.firefoxPreference = firefoxPreference;
    }

    @Test
    public void shouldShowErrorMessageWhenPostEmptyComment() {
        testHelper.navigateToCommentView();
        testHelper.clickElement(By.id("postBtn"));
        testHelper.assertDisplayedMessageIs("Please enter a message");
    }

    @Test
    public void shouldShowCreatedComments() {
        testHelper.navigateToMainBoardView();
        String comment = String.valueOf(System.currentTimeMillis());
        testHelper.addText("commentText", comment);

        testHelper.clickElement(By.id("postBtn"));

        testHelper.assertContent("commentArea", comment);

        testHelper.refreshWebPage();
        testHelper.assertContent("commentArea", comment);
    }

    @After
    public void tearDown() {
        testHelper.closeWebDriver();
    }

}
