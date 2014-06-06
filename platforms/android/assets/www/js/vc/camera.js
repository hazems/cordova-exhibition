(function() {
    var cameraManager = CameraManager.getInstance();
    
    $(document).on("pageinit", "#camera", function(e) {
        e.preventDefault();

		$("#imageView").hide();  
               
        $("#getPicture").on("tap", function(e) {
            e.preventDefault();
            
            $("#pictureTypeSelection").popup("open");
        });        
        
        $("#pictureFromGallery").on("tap", function(e) {
            e.preventDefault();
            $("#pictureTypeSelection").popup("close");
            
            getPhoto(true);
         });    
        
        $("#pictureFromCamera").on("tap", function(e) {
            e.preventDefault();
            $("#pictureTypeSelection").popup("close");
            
            getPhoto(false);
         });
    });
    
    function getPhoto(fromGallery) {
        var callback = {};
        
        callback.onSuccess = onSuccess;
        callback.onError = onError;
        
        cameraManager.getPicture(callback, fromGallery);        
    }
    
    function onSuccess(fileURI) {            
        $("#imageView").show();  
        $("#imageView").attr("src", fileURI);
    }
    
    function onError(message) {
        console.log("Camera capture error");
    }
})();
