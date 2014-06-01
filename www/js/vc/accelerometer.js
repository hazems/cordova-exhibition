(function() {
    var accelerometerManager = AccelerometerManager.getInstance();
    
    $(document).on("pageinit", "#accelerometer", function(e) {
        e.preventDefault();
        
        $("#startWatchAcceleration").on("tap", function(e) {
            e.preventDefault();
            
            enableStartWatchAccelerationButton(false); 
            
            var watchCallback = {};
            
            watchCallback.watchSuccess = handleWatchSuccess;
            watchCallback.watchError = handleWatchError;
            
            accelerometerManager.startWatchAcceleration(watchCallback);          
        });       
        
        $("#stopWatchAcceleration").on("tap", function(e) {
            e.preventDefault();

            enableStartWatchAccelerationButton(true);
            
            accelerometerManager.stopWatchAcceleration();         
        });
           
        initPage();
    });
    
    $(document).on("pagebeforehide", "#accelerometer", function(e) {
    	
    	//Make sure to stop heading watch before leaving the view. 
    	accelerometerManager.stopWatchAcceleration();
    	enableStartWatchAccelerationButton(true);
    });    
    
    function initPage() {
        $("#stopWatchAcceleration").closest('.ui-btn').hide(); 	
    }
    
    function handleWatchSuccess(acceleration) {
        $("#acceleration").html("Acceleration X: " + acceleration.x + "<br/>" +
          "Acceleration Y: " + acceleration.y + "<br/>" +
          "Acceleration Z: " + acceleration.z + "<br/>" +
          "Timestamp: "      + acceleration.timestamp + "<br/>");    
    }
    
    function handleWatchError() {
    	console.log("An error occurs during watching acceleration.");
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