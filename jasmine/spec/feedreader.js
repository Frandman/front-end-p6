
$(function() {

    'use strict';

    /* Test suite to test app global features */

    describe ('RSS Feed App', function(){
        var feedLength = allFeeds.length;
        var fakeFeed = {
            name: 'FakeFeed',
            url: 'www.fakeurl.com'
        };

        /* Before each test, we add our fake feed */

        beforeEach(function() {
            addFeed(fakeFeed);
        });

        /* Spec to test if the addFeed option exist */

        it('should have an addFeed function', function(){
            expect(addFeed).toBeDefined();
        });

        /* Spec to test if the new feed is effectively added */

        it('should accept new Feeds', function(){
            expect(feedLength).toBeGreaterThan(allFeeds.length);
        });
    });

    /* Test suite to test feed features */

    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('each has a URL defined and the URL is not empty',function() {
            for ( var i = 0; i < allFeeds.length; i++ ) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });

        it('each has a name defined and the name is not empty.',function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
        });
    });

    /* Test suite to test hidding menu functionality */

    describe('The menu', function(){
        var body = $('body');
        var menu_icon = $('.menu-icon-link');

        it('should be hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        it('should hidde when clicked', function() {
            menu_icon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menu_icon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite to test feed loading */

    describe('Initial entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
       });

        it('are loaded properly (at least one present)', function(done) {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
       });

    });

    /* Test suite to test feed selection behaviour */

    describe('New Feed Selection', function() {
        var oldContent;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedContent = $('.feed').html();
                done();
            });
        });

        it('changes content when a new feed a loaded', function(done) {
            loadFeed(1, function() {
                expect($('.feed').html() == feedContent).toBeFalsy();
                done();
            });
        });
    });
}());
