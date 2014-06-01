(function() {
    var geolocationManager = GeolocationManager.getInstance();
    
    $(document).on("pageinit", "#geolocation", function(e) {
        e.preventDefault();
        
        $("#startWatchPosition").on("tap", function(e) {
            e.preventDefault();
            
            enableStartWatchPositionButton(false); 
            
            var watchCallback = {};
            
            watchCallback.watchSuccess = handleWatchSuccess;
            watchCallback.watchError = handleWatchError;
            
            geolocationManager.startWatchPosition(watchCallback);          
        });       
        
        $("#stopWatchPosition").on("tap", function(e) {
            e.preventDefault();

            enableStartWatchPositionButton(true);
            
            geolocationManager.stopWatchPosition();         
        });
           
        initPage();
    });
    
    $(document).on("pagebeforehide", "#geolocation", function(e) {
        
        //Make sure to stop heading watch before leaving the view. 
    	geolocationManager.stopWatchPosition();
    	enableStartWatchPositionButton(true);
    });    
    
    function initPage() {
        $("#stopWatchPosition").closest('.ui-btn').hide();     
    }
    
    function handleWatchSuccess(position) {
        $("#position").html("Current Position: <br/>" + 
                            "Latitude: "  + position.coords.latitude + "<br />" +
                            "Longitude: " + position.coords.longitude + "<br />");    
    }
    
    function handleWatchError(error) {
        console.log("An error occurs during watching position: " + error.code);
    }  
    
    function enableStartWatchPositionButton(enable) {
        
        if (enable) {
            $("#startWatchPosition").button("enable");
            $("#stopWatchPosition").closest('.ui-btn').hide(); 
        } else {
            $("#startWatchPosition").button("disable");
            $("#stopWatchPosition").closest('.ui-btn').show(); 
        }
        
        $("#startWatchPosition").button("refresh");
    }
    
})();