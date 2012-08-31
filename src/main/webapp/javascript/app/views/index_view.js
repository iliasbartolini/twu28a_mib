/**
 * IndexView: The default view seen when opening up the application for the first time.
 * This will be just a message to request user to enter specific board URL for now
 * @type Backbone.View
 */
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