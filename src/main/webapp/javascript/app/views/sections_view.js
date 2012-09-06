$(document).ready(function () {
    IdeaBoardz.SectionsView = Backbone.View.extend({
        el: $('#viewWrapper'),
        template: _.template($('#template-sectionsView').html()),
        navigationTemplate: _.template($("#template-navigation").html()),
        boardName: "",
        boardID: null,

        initialize: function(boardname, id) {
            this.boardID=id;
            this.boardName=boardname;
            this.render();
        },

        events: {
            "click #createIdeaBtn": "createIdea"
        },


        createIdea: function(event){
            console.log("in create idea");
        },

        render: function() {
            $(this.el).find("#navigation").append(this.navigationTemplate());

            var html = this.template();
            $(this.el).find('#container').html(html);  // Replace the view's element with the result
            return this;
        }
    });
});
