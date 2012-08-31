IdeaBoardz.IdeaCreationBinding = {
    bind: function (submitButton, sectionId, ideaTextBox){
          submitButton.bind('click', function(){
              IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId.val(), ideaTextBox.val());
              ideaTextBox.val("");
          });
    }
};

$(document).ready( function(){
    IdeaBoardz.IdeaCreationBinding.bind($('#submitBtn'), $('#sectionId'), $('#ideaText'));
});