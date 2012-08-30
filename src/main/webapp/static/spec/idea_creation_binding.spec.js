
describe("UI interaction", function() {
    it("should submit idea upon submit button click", function() {
        // arrange
        var submitButton = $("<button>");
        var ideaTextBox = $("<textarea>").val("some");

        IdeaBoardz.IdeaCreationBinding.bind(submitButton, ideaTextBox);

        spyOn($, 'ajax');

        submitButton.click();

        expect($.ajax).toHaveBeenCalledWith({
            type: 'POST',
            url: 'http://10.10.15.130:3000/points.json?point[section_id]=2&point[message]=some'
        });
    });

    it("should correctly submit with values with special symbols, including space, exclamation, etc", function(){
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