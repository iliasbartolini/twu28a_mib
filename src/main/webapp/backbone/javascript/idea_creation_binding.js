IdeaBoardz.IdeaCreationBinding = {
    bind: function (submitButton, ideaTextBox){
          submitButton.bind('click', function(){
              IdeaBoardz.WebIdeaBoardz.instance.createIdea(ideaTextBox.val());
          });
    }
};

$(document).ready( function(){
    IdeaBoardz.IdeaCreationBinding.bind($('#submitBtn'), $('#ideaText'));
});