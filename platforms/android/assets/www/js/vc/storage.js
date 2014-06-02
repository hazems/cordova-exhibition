(function() {
    var storageManager = StorageManager.getInstance();
    var INFO_KEY = "cordovaExhibition.userInfo";
    
    $(document).on("pageinit", "#storage", function(e) {
        e.preventDefault();
        
        $("#saveInfo").on("tap", function(e) {
            e.preventDefault();                    
            
            storageManager.set(INFO_KEY, JSON.stringify({
                                             userName: $("#userName").val(), 
                                             address: $("#address").val()
                                         })
            ); 
            
            $("#storageResult").html("User Information are saved");
        }); 
        
        $("#reloadInfo").on("tap", function(e) {
            e.preventDefault();
            
            reloadUserInfo();   
            
            $("#storageResult").html("Reloading completes");   
        });
    });
    
    $(document).on("pageshow", "#storage", function(e) {
        e.preventDefault();
        
        reloadUserInfo();
    });
    
    function reloadUserInfo() {
        var userInfo = JSON.parse(storageManager.get(INFO_KEY));
        
        populateFormFields(userInfo);
    }
    
    function populateFormFields(userInfo) {
        if (userInfo) {
            $("#userName").val(userInfo.userName);
            $("#address").val(userInfo.address);    
        }        
    }
    
})();