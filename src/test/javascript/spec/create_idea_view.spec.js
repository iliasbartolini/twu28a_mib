
describe("UI interaction", function() {

    it ("should trigger click event on submit button click", function(){
        var container = $("<div></div>");
        var template = "<button class='submitButton'></button>";
        //console.log("template: "+template.html());

        var ideaTextBox = $("<textarea>").val("some");

        var view = new CreateIdeaView(container, template, ideaTextBox, "boardName", 3);

        console.log(container);
        var button = container.find(".submitButton");

        spyOnEvent(button,"click");

        button.click();

        expect('click').toHaveBeenTriggeredOn(button);
    });

    xit("should submit idea upon submit button click", function() {
        // arrange
        var container = $("<div></div>");
        var template = "<button class='submitButton'></button>";

        var ideaTextBox = $("<textarea>").val("some");

        var view = new CreateIdeaView(container, template, ideaTextBox, "boardName", 3);

        spyOn($, 'ajax');

        console.log("Before submitButton.click");

        var button = container.find(".submitButton");
        button.click();

        expect($.ajax).toHaveBeenCalled();
    });



    xit("should correctly submit with values with special symbols, including space, exclamation, etc", function(){
        // arrange
        var submitButton = $("<button>");
        var ideaTextBox = $("<textarea>").val("this value & that value/something?");

        IdeaBoardz.IdeaCreationBinding.bind(submitButton, ideaTextBox);

        spyOn($, 'ajax');

        submitButton.click();

        expect($.ajax).toHaveBeenCalledWith({
            type: 'POST',
            url: 'http://10.10.15.130:3000/points.json?point[section_id]=2&point[message]=this%20value%20%26%20that%20value%2Fsomething%3F'
        });

    });

});