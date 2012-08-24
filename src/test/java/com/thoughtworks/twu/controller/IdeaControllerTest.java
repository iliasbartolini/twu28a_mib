package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.Idea;
import com.thoughtworks.twu.domain.IdeaForm;
import junit.framework.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.web.servlet.ModelAndView;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

public class IdeaControllerTest
{
    IdeaController ideaController;

    @Before
    public void setUp()
    {
        ideaController = new IdeaController();
    }
    @Test
    public void shouldDisplayCreateIdeaPageWhenShowCreateIdeaPageIsCalled()
    {
        ModelAndView modelAndView = ideaController.showCreateIdeaPage();
        assertEquals("example/createIdea", modelAndView.getViewName());
    }

    @Test
    public void shouldDisplayCreateIdeaPageAfterCreatingIdea()
    {
        IdeaForm form = new IdeaForm("1","hi");

        ModelAndView modelAndView = ideaController.createIdea(form);

        assertThat((IdeaForm) modelAndView.getModel().get("createNewIdeaForm"), is(form));
        assertThat( modelAndView.getViewName(), is("example/createIdea"));
    }

    @Test
    public void shouldReturnIdeaObjectWhenCreateIdeaIsCalled()
    {
        IdeaForm form = new IdeaForm("1", "hi");
        ModelAndView modelAndView = ideaController.createIdea(form);
        Idea idea =(Idea)modelAndView.getModel().get("idea");
        assertNotNull(idea);

    }

}