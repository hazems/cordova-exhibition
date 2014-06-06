(function() {
    var geolocationManager = GeolocationManager.getInstance();
    
    $(document).on("pageinit", "#geolocation", function(e) {
        e.preventDefault();
        
        $("#getCurrentPosition").on("tap", function(e) {
            e.preventDefault();
            
            var callback = {};
            
            callback.onSuccess = onSuccess;
            callback.onError = onError;
            
            geolocationManager.getCurrentPosition(callback);          
        });
    });
    
    function onSuccess(position) {
        console.log("position is retrieved successfully");
        
        $("#position").html("Latitude: "  + position.coords.latitude + "<br />" +
                            "Longitude: " + position.coords.longitude);    
    }
    
    function onError(error) {
    	$("#position").html("Error code: " + error.code + ", message: " + error.message);
    }     
})();