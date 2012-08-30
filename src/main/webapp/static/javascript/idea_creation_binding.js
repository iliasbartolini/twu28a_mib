MobileIdeaBoardz.IdeaCreationBinding = {
    bind: function (submitButton, ideaTextBox){
          submitButton.bind('click', function(){
              MobileIdeaBoardz.WebIdeaBoardz.instance.createIdea(ideaTextBox.val());
          });
    }
};

$(document).ready( function(){
    MobileIdeaBoardz.IdeaCreationBinding.bind($('#submitBtn'), $('#ideaText'));
});