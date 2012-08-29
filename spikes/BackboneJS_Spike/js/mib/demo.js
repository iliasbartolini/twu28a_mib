//Idea = Idea.Model.extend({
//    // If you return a string from the validate function,
//    // Backbone will throw an error
//    validate: function( attributes ){
//        if( attributes.message.length <= 0){
//            return "Idea cannot be empty";
//        }
//    },
//    initialize: function(){
//        alert("New idea created!");
//        this.bind("error", function(model, error){
//            // We have received an error, log it, alert it or forget it :)
//            alert( error );
//        });
//    }
//});

//$(document).ready(function(){
//    var newIdeaView = new NewIdeaView();
//});