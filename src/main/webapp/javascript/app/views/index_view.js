
var IndexView = Backbone.View.extend({
    el: null,
    template: null,

    initialize: function(container, template) {
        this.el = container;
        this.template = _.template(template.html());
        this.render();
    },

    render: function() {
        var html = this.template();
        $(this.el).html(html);  // Replace the view's element with the result
        return this;
    }
});