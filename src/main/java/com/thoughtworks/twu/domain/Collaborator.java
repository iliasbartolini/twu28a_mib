package com.thoughtworks.twu.domain;

/**
 * Created with IntelliJ IDEA.
 * User: ankit
 * Date: 24/8/12
 * Time: 11:35 AM
 * To change this template use File | Settings | File Templates.
 */
public class Collaborator
{
    public Idea createIdea(int sectionId, String ideaText)
    {
        return new Idea(sectionId,ideaText);
    }
}
