(function() {
    var accelerometerManager = AccelerometerManager.getInstance();
    var watchID;
    
    $(document).on("pageinit", "#accelerometer", function(e) {
        e.preventDefault();
        
        $("#startWatchAcceleration").on("tap", function(e) {
            e.preventDefault();
            
            enableStartWatchAccelerationButton(false); 
            
            var callback = {};
            
            callback.onSuccess = onSuccess;
            callback.onError = onError;
            
            watchID = accelerometerManager.startWatchAcceleration(callback);          
        });       
        
        $("#stopWatchAcceleration").on("tap", function(e) {
            e.preventDefault();

            enableStartWatchAccelerationButton(true);
            
            accelerometerManager.stopWatchAcceleration(watchID);         
        });
           
        initPage();
    });
    
    $(document).on("pagebeforehide", "#accelerometer", function(e) {
        
        //Make sure to stop heading watch before leaving the view. 
        accelerometerManager.stopWatchAcceleration(watchID);
        enableStartWatchAccelerationButton(true);
    });    
    
    function initPage() {
        $("#stopWatchAcceleration").closest('.ui-btn').hide();     
    }
    
    function onSuccess(acceleration) {
        $("#acceleration").html("Acceleration X: " + acceleration.x + "<br/>" +
          "Acceleration Y: " + acceleration.y + "<br/>" +
          "Acceleration Z: " + acceleration.z + "<br/>" +
          "Timestamp: "      + acceleration.timestamp + "<br/>");    
    }
    
    function onError() {
    	$("#acceleration").html("An error occurs during watching acceleration.");
    }  
    
    function enableStartWatchAccelerationButton(enable) {
        if (enable) {
            $("#startWatchAcceleration").button("enable");
            $("#stopWatchAcceleration").closest('.ui-btn').hide(); 
        } else {
            $("#startWatchAcceleration").button("disable");
            $("#stopWatchAcceleration").closest('.ui-btn').show(); 
        }
        
        $("#startWatchAcceleration").button("refresh");
    }
    
})();