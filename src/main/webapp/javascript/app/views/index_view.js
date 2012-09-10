/**
 * IndexView: The default view seen when opening up the application for the first time.
 * This will be just a message to request user to enter specific board URL for now
 * @type Backbone.View
 */
$(document).ready(function () {
    IdeaBoardz.IndexView = Backbone.View.extend({
        el:$("#viewWrapper"),
        template:_.template($("#template-index").html()),

        initialize:function () {
            this.render();
        },

        render:function () {
            $(this.el).find("#navigation").empty();
            $(this.el).find("#container").html(this.template());

            return this;
        }
    });
});
