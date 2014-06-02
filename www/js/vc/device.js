(function() {
    var deviceManager = DeviceManager.getInstance();
    
    $(document).on("pageinit", "#device", function(e) {
        e.preventDefault();
        
        $("#getDeviceInfo").on("tap", function(e) {
            e.preventDefault();
                        
            $("#deviceInfo").html(deviceManager.getDeviceInfo());          
        }); 
    });
})();