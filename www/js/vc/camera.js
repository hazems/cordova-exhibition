(function() {
    var cameraManager = CameraManager.getInstance();
    
    $(document).on("pageinit", "#camera", function(e) {
        e.preventDefault();
               
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
        var capturingCallback = {};
        
        capturingCallback.captureSuccess = handleCaptureSuccess;
        capturingCallback.captureError = handleCaptureError;
        
        cameraManager.getPicture(capturingCallback, fromGallery);        
    }
    
    function handleCaptureSuccess(fileURI) {            
        $("#imageView").show();  
        $("#imageView").attr("src", fileURI);
    }
    
    function handleCaptureError(message) {
        console.log("Camera capture error");
    }
})();
