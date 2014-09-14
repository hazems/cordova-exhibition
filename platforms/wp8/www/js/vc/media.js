(function() {
    var mediaManager = MediaManager.getInstance(), recInterval;
    
    $(document).on("pageinit", "#mediaFC", function(e) {
        e.preventDefault();
        
        $("#recordSound").on("tap", function(e) {
            e.preventDefault();
            
            disableActionButtons();
            
            var callback = {};
            
            callback.onSuccess = handleRecordSuccess;
            callback.onError = handleRecordError;
            
            mediaManager.startRecording(callback);
            
            var recTime = 0;
            
            $("#soundDuration").html("Duration: " + recTime + " seconds");
            
            $("#recordSoundDialog").popup("open");
            
            recInterval = setInterval(function() {
                                         recTime = recTime + 1;
                                         $("#soundDuration").html("Duration: " + recTime + " seconds");
                                     }, 1000);            
        });       
        
        $("#recordSoundExt").on("tap", function(e) {
            e.preventDefault();

			if (device.platform.indexOf("Win") == 0) {
				alert("This feature is not working properly in Windows platform by Cordova " + device.cordova);
				return;			
			}
            
            disableActionButtons();
            
            var callback = {};
            
            callback.onSuccess = handleRecordSuccess;
            callback.onError = handleRecordError;
            
            mediaManager.recordVoiceExternally(callback);         
        });
        
        $("#recordSoundDialog").on("popupafterclose", function(e, ui) {
            e.preventDefault();
            
            clearInterval(recInterval);
            mediaManager.stopRecording();
        });        
        
        $("#stopRecordingSound").on("tap", function(e) {
            e.preventDefault();
            
            $("#recordSoundDialog").popup("close");
        });
        
        $("#playSound").on("tap", function(e) {
            e.preventDefault();
            
            disableActionButtons();
        
            var callback = {};
            
            callback.onSuccess = handlePlaySuccess;
            callback.onError = handlePlayError;
            
            mediaManager.playVoice($("#location").val(), callback);
        });      
        
        initPage();
    });
    
    $(document).on("pagebeforehide", "#mediaFC", function(e) {
        
        //Make sure to stop any playing voices when the media view is left. 
        mediaManager.cleanUpResources();
        enableActionButtons();
    });    
    
    function initPage() {
        $("#playSound").closest('.ui-btn').hide();     
    }
    
    function handleRecordSuccess(filePath) {
        $("#location").val(filePath);    
        enableActionButtons();
        $("#playSound").closest('.ui-btn').show();  
    }
    
    function handleRecordError(error) {
        console.log("An error occurs during recording: " + error.code);
        enableActionButtons();
    }  
    
    function handlePlaySuccess() {
        console.log("Sound file is played successfully ...");
        enableActionButtons();
    }
    
    function handlePlayError(error) {
        if (error.code) {
            console.log("An error happens when playing sound file ...");
            enableActionButtons();
        }
    }
    
    function enableActionButtons() {
        $("#recordSound").button("enable");
        $("#recordSoundExt").button("enable");
        $("#playSound").button("enable");
        
        refreshActionButtons();       
    }
    
    function disableActionButtons() {
        $("#recordSound").button("disable");
        $("#recordSoundExt").button("disable");
        $("#playSound").button("disable");
        
        refreshActionButtons();
    }  
    
    function refreshActionButtons() {
        $("#recordSound").button("refresh");
        $("#recordSoundExt").button("refresh");
        $("#playSound").button("refresh");
    }
        
})();
