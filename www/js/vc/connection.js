(function() {
    var connectionManager = ConnectionManager.getInstance();
    
    $(document).on("pageinit", "#connection", function(e) {
        e.preventDefault();
        
        $("#getConnectionType").on("tap", function(e) {
            e.preventDefault();
                        
            $("#connectionType").html("Current Connection: " + connectionManager.getCurrentConnection());          
        }); 
    });
})();