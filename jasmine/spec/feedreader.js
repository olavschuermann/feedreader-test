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
        it('RSS Feeds is defined and has content', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined and not empty', function() {
            allFeeds.forEach(function(item) {
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
                // console.log(item.url + item.url.length);
            });          
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined and not empty', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);
                // console.log(item.name + item.name.length);
            });          
        });        

    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. It analyzes the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element hidden by default', function() {
            expect(document.body.classList).toContain('menu-hidden');
        });   
        
        /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility if clicked', function() {
            $('a.menu-icon-link').trigger('click'); // show the menu
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click'); // hide the menu
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('at least one .entry element is in .feed', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });   
        
    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let firstFeed;
        let secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // check if first feed loaded
                // console.log('Loading for first feed complete!');
                firstFeed = $('.feed').html();

                loadFeed(1, function() {
                    // check if second feed loaded
                    // console.log('Loading for second feed complete!');
                    done();
                });
            });
        });

        it('new feed load changes content', function() {
            expect(firstFeed).toBeDefined();
            expect(secondFeed).not.toBeDefined();

            secondFeed = $('.feed').html();
            expect(secondFeed).toBeDefined();
            expect(firstFeed).not.toBe(secondFeed);
        });
    });   
}());