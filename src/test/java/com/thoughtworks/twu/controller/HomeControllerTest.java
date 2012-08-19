package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.User;
import com.thoughtworks.twu.service.UserService;
import org.junit.Test;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class HomeControllerTest {

    @Test
    public void shouldAddUsernameAndUserObjectToPageModelWhereUserExists() throws Exception {
        ModelAndView modelAndView = homepageModelAndView("valid-user", true);

        String username = (String) modelAndView.getModel().get("username");
        User user = (User) modelAndView.getModel().get("user");

        assertThat(username, equalTo("valid-user"));
        assertThat(user.getName(), equalTo("valid-user"));
    }

    @Test
    public void shouldOnlyAddUsernameToPageModelWhereUserNotFound() throws Exception {
        ModelAndView modelAndView = homepageModelAndView("invalid-user", false);

        String username = (String) modelAndView.getModel().get("username");
        User user = (User) modelAndView.getModel().get("user");

        assertThat(username, equalTo("invalid-user"));
        assertThat(user, is(nullValue()));
    }

    private ModelAndView homepageModelAndView(String username, boolean validUser) throws IOException {
        UserService mockUserService = mock(UserService.class);
        User user = (validUser) ? new User(username) : null;
        when(mockUserService.getUser(username)).thenReturn(user);

        com.thoughtworks.twu.controller.HomeController homeController = new HomeController(mockUserService);
        return homeController.homepage(username);
    }

}
