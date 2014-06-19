(function() {
    var inAppBrowserManager = InAppBrowserManager.getInstance();
    
    $(document).on("pageinit", "#inAppBrowser", function(e) {
        e.preventDefault();
        
        $("#openGoogleSearchPage").on("tap", function(e) {
            e.preventDefault();
 
            var windowRef = inAppBrowserManager.openWindow("http://www.google.com");    

            //Close the window after 10 seconds ...
            window.setTimeout(function() {
                console.log("It is over. Time to close the window ...");
                inAppBrowserManager.closeWindow(windowRef);
            }, 10000);
        });         
    });    
})();