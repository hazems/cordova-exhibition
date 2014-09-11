(function() {
    var notificationManager = NotificationManager.getInstance();
    
    $(document).on("pageinit", "#notification", function(e) {
        e.preventDefault();
        
        $("#showAlert").on("tap", function(e) {
            e.preventDefault();
 
            notificationManager.showAlert("This is an Alert", onOk, "Iam an Alert", "Ok");          
        }); 
        
        $("#showConfirm").on("tap", function(e) {
            e.preventDefault();
 
            notificationManager.showConfirm("This is a confirmation", onConfirm, "Iam a confirmation", "Ok,Cancel");          
        });         
        
        $("#showPrompt").on("tap", function(e) {
            e.preventDefault();
 
            notificationManager.showPrompt("What is your favorite food?", onPrompt, "Iam a prompt", ["Ok", "Cancel"], "Pizza");          
        });          
        
        $("#vibrate").on("tap", function(e) {
            e.preventDefault();
 
            notificationManager.vibrate(2000);          
        });  

        $("#beep").on("tap", function(e) {
            e.preventDefault();
 
            notificationManager.beep(3);          
        });        
        
    });
    
    function onOk() {            
        $("#notificationResult").html("You clicked Ok<br/>");
    }
    
    function onConfirm(index) {            
        $("#notificationResult").html("You clicked " + ((index == 1) ? "Ok":"Cancel") + "<br/>");
    }    
    
    function onPrompt(result) {            
        if (result.buttonIndex == 1) {
            $("#notificationResult").html("You entered: " + result.input1);
        }
    }        
})();