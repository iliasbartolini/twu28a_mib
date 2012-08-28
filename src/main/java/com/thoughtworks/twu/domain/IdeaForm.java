package com.thoughtworks.twu.domain;

public class IdeaForm
{
    private String sectionId;
    private String ideaText;
    public String alert;

    public IdeaForm(String sectionId, String ideaText)
    {
        this.sectionId = sectionId;
        this.ideaText = ideaText;
    }

    public IdeaForm()
    {

    }

    public String getAlert() {
        return alert;
    }

    public void setAlert(String alert) {
        this.alert = alert;
    }

    public Integer getSectionId()
    {
       return 20;
    }

    public String getIdeaText()
    {
        return ideaText;
    }

    public void setIdeaText(String ideaText){
        this.ideaText = ideaText;
    }

    public void setSectionId(String sectionId){
        this.sectionId = sectionId;
    }


    public boolean isValid()
    {
        if (ideaText == null || ideaText.trim().equals("")) {
            alert = "Your idea is empty";
            return false;
        }
        return true;
    }
}
