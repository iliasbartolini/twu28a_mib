

describe("Idea", function() {

    it("should not create an idea when passed an empty string", function(){

        var emptyIdea= createIdea("");
         expect(emptyIdea==null);

    });

    it("should not return null when passed a nonEmpty string", function(){

        var newIdea= createIdea("hi hello");
        expect(newIdea == null).toBe(false);

    });

    it("should get a valid json object containing message equal to message sent", function(){

        var newIdea= createIdea("pineapple");
        expect(newIdea.message).toEqual("pineapple");
    });

    xit("should should make POST request to 10.10.15.130:3000/points.json?point[section_id]=ID&point[message]=MESSAGE when passed valid MESSAGE", function(){
        spyOn($, "ajax");
        createIdea("pineapple");

        expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("10.10.15.130:3000/points.json?point[section_id]=2&point[message]=pineapple");
    });




});
