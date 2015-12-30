/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* All objects inside allFeeds are of the correct type */

        it('has the correct type', function(){
            function Feed (feed) {
                this.name = feed.name,
                this.url = feed.url
             };
            var fakeFeed = {name: 'name', href: 'href'};
            allFeeds.forEach(function(feed){
                expect(new Feed(feed)).toEqual(jasmine.any(Object));
                expect(new Feed(feed)).toEqual(jasmine.any(Feed));
                expect(fakeFeed).not.toEqual(jasmine.any(Feed));
            })
        });




        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it("each has a URL defined and the URL is not empty",function(){
            for (var i =0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it("each has a name defined and the name is not empty.",function(){
            for (var i =0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe("The menu", function(){
        var body = $("body");
        var menu_icon = $('.menu-icon-link');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it("should be hidden by default", function(){
            expect(body.hasClass('menu-hidden')).toBeTruthy();
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it("should hidde when clicked", function(){
            menu_icon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menu_icon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
         });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial entries', function(){


        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

       beforeEach(function(done) {
         loadFeed(0, done);
       });

       it('are loaded properly (at least one present)', function(done) {
         expect($(".feed .entry").length).toBeGreaterThan(0);
         done();
       })

    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var oldContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedContent = $('.feed').html();
                done();
            });
        });

        it('feed content changes', function(done) {
            loadFeed(1, function() {
                expect($('.feed').html() == feedContent).toBeFalsy();
                done();
            });
        });
    });
}());
