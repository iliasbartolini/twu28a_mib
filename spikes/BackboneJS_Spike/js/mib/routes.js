var AppRouter = Backbone.Router.extend({
    routes: {
        "/for/:boardName/:id": "displayNewIdeaForm",
        "*actions": "defaultRoute" // matches http://localhost:8080/mib/#anything-here
    },
    displayNewIdeaForm: function( boardName, id ) {
        // Note the variable in the route definition being passed in here
        alert( "Boardname: " + boardName + " Board ID: " + id);
//        var currentBoardz = new IdeaBoardz({ name: "Thomas", age: 67, children: ['Ryan']});
        var newIdeaView = new NewIdeaView();
        newIdeaView.render();
    },
    defaultRoute: function( actions ){
        alert( "this link lead to nowhere. use correct link please!" );
    }
});

// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a neccesary step for bookmarkable URL's
Backbone.history.start();
