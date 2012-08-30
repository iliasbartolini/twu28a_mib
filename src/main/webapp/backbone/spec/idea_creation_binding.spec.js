
describe("UI interaction", function() {
    it("should submit idea upon submit button click", function() {
        // arrange
        var container = $("<div></div>");
        var template = "<button class='submitButton'></button>";

        var ideaTextBox = $("<textarea>").val("some");

        var view = new CreateIdeaView(container, template, ideaTextBox, "name", 3);

        spyOn($, 'ajax');

        console.log("Before submitButton.click");
        console.log(container);
        container.find(".submitButton").trigger("click");

        expect($.ajax).toHaveBeenCalledWith({
            type: 'POST',
            url: 'http://10.10.15.130:3000/points.json?point[section_id]=2&point[message]=some'
        });
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