describe("MIB Navigation", function(){

    beforeEach(function(){
        this.router= new AppRouter();
        try {
            Backbone.history.start({silent:true, pushState:true});
        } catch(e) {}
        this.router.navigate('test/javascript/SpecRunner.html');
    });


    xit ("should navigate to sections page when proper URL is entered", function(){

        this.routerSpy = spyOn(this.router, 'sectionsList');

        // The spy created by Jasmine spy would replace the original method of "sectionsList"
        // However, Backbone have some internal function that create another router in its "initialize" method
        // when the navigation() function is called, so the router called by BB and the spy are 2 different objects
        // thus, the bind below is necessary
        // http://stackoverflow.com/questions/10865364/qunit-sinon-js-backbone-unit-test-frustration-sinon-spy-appears-to-fail-to-d
        this.router.bind("route:sectionsList", this.routerSpy);

        this.router.navigate("for/mibTest/9", {trigger: true});

        expect(this.router.sectionsList).toHaveBeenCalledWith("mibTest", "9");

    });

    xit("should call SectionView when board url is entered", function(){


        var viewSpy = jasmine.createSpy();
        this.router.bind("", this.routerSpy);

       this.router.navigate("for/mibTest/9", {trigger: true});

        expect(viewSpy).toHaveBeenCalled();

    });



    afterEach(function(){
        this.router.navigate('test/javascript/SpecRunner.html');
        Backbone.history.stop();
    });

});