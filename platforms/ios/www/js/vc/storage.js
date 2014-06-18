(function() {
    var storageManager = StorageManager.getInstance();
    var INFO_KEY = "cordovaExhibition.userInfo";
    
    $(document).on("pageinit", "#storage", function(e) {
        e.preventDefault();
        
        $("#saveInfo").on("tap", function(e) {
            e.preventDefault();          
            
            
            if (! $("#storageForm").valid()) {
                return;
            }
            
            storageManager.set(INFO_KEY, JSON.stringify({
                                             userName: $("#userName").val(), 
                                             userEmail: $("#userEmail").val()
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
        
        $("#storageForm").validate({
        	errorLabelContainer: "#storageMessageBox",
        	wrapper: "li", 
        	rules: {
        		userName: "required",
        		userEmail: {
                    required: true,
                    email: true
                }
            },
            messages: {
            	userName: "Please specify user name",
            	userEmail: {
                    required: "Please specify email",
                    email: "Please enter valid email"
                }
            }
        }); 
        
        reloadUserInfo();
    });
    
    function reloadUserInfo() {
        var userInfo = JSON.parse(storageManager.get(INFO_KEY));
        
        populateFormFields(userInfo);
    }
    
    function populateFormFields(userInfo) {
        if (userInfo) {
            $("#userName").val(userInfo.userName);
            $("#userEmail").val(userInfo.userEmail);    
        }        
    }
    
})();