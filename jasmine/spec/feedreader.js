/* 
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    describe('RSS Feeds', function() {
        //Tests allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Tests each feed to have a defined URL in string format
        it('is a valid URL', function(){
            let hasURL = true;
            let urlDefined = true;
            for(var i = 0; i < allFeeds.length; i++){
                if(allFeeds[i].url === undefined && typeof allFeeds[i].url === 'string'){
                    hasURL = false;
                } else {
                    if(allFeeds[i].url.length < 1){
                        urlDefined = false;
                    }
                }
            }
            expect(hasURL).toBe(true);
            expect(urlDefined).toBe(true);
        })

        //Tests each feed to have a defined name
        it('has a valid name', function(){
            let hasName = true;
            let nameDefined = true;
            for(var i = 0; i < allFeeds.length; i++){
                if(allFeeds[i].name === undefined){
                    hasName = false;
                } else {
                    if(allFeeds[i].name.length < 1){
                        nameDefined = false;
                    }
                }
            }
            expect(hasName).toBe(true);
            expect(nameDefined).toBe(true);
        })
    });

    describe('The menu', function() {
        //Tests that the menu is hidden on page load
        it('menu is hidden by default', function(){
            expect(document.getElementsByTagName('body')[0].classList.contains('menu-hidden')).toBe(true);
        })
         //Simulates 'click' for menu icon and tests for visibility toggle
         it('menu changes visibility when clicked', function(){
            $('.menu-icon-link').click();
            expect(document.getElementsByTagName('body')[0].classList.contains('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect(document.getElementsByTagName('body')[0].classList.contains('menu-hidden')).toBe(true);
        })
    })

    //Tests if there is at least one .entry element within .feed container
    describe('Initial Entries', function(){
        beforeEach(function(done){
             loadFeed(0, done);
        });
        it('should have one entry by default', function(){
            container = $('.feed .entry');
            expect(container.length).toBeGreaterThan(0);
        })
    })
    
    //Tests for change in content upon new feed loading
    describe('New Feed Selection', function(){
        let secondFeed;
        let thirdFeed;
        beforeEach(function(done){
            loadFeed(1, function(){
                secondFeed = $('.feed')[0].innerText;
                loadFeed(2, function(){
                    thirdFeed = $('.feed')[0].innerText;
                    done();
                });
            });
        });
        it('should load new feeds', function(){
            expect(secondFeed).not.toBe(thirdFeed);
        })
    })
}());
