
var SectionsView = Backbone.View.extend({
    el: $('#container'),
    template: _.template($('#template-sectionsView').html()),

    initialize: function(boardname, id) {
        //var board = IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardname, id);
        //alert("Result: " + board.name + "ID: " + board.id);
        this.render();
    },

    render: function() {
        var html = this.template();
        $(this.el).html(html);  // Replace the view's element with the result
        return this;
    }
});