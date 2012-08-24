package com.thoughtworks.twu.controller;

import com.thoughtworks.twu.domain.Collaborator;
import com.thoughtworks.twu.domain.Idea;
import com.thoughtworks.twu.domain.IdeaForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IdeaController
{
    @RequestMapping(value = "createIdea", method = RequestMethod.GET)
    public ModelAndView showCreateIdeaPage()
    {
        ModelAndView modelAndView = new ModelAndView("example/createIdea");
        return modelAndView;
    }
    @RequestMapping(value = "createIdea", method = RequestMethod.POST)
    public ModelAndView createIdea(@ModelAttribute() IdeaForm ideaForm)
    {
        ModelAndView modelAndView = new ModelAndView("example/createIdea");
        if(ideaForm.isValid())
        {
            Collaborator collaborator = new Collaborator();
            Idea idea = collaborator.createIdea(Integer.parseInt(ideaForm.getSectionId()),ideaForm.getIdeaText());
            modelAndView.addObject("createNewIdeaForm", ideaForm);
            modelAndView.addObject("idea",idea);
        }
        return modelAndView;
    }
}
