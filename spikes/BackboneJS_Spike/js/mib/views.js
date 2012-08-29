var NewIdeaView = Backbone.View.extend({
    el: $('body'), // attaches `this.el` to an existing element.

    initialize: function(){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

        this.render(); // not all views are self-rendering. This one is.
    },

    template: _.template($("#template-newIdea").html()),

    render: function(){
        var html = this.template();
        $(this.el).append(html);
    }
});
