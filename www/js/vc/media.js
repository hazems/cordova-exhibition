(function() {
    var mediaManager = MediaManager.getInstance();
    
    $(document).on("pageinit", "#media", function(e) {
        e.preventDefault();
        
        $("#recordSound").on("tap", function(e) {
            e.preventDefault();
            
            disableActionButtons();
            
            var recordingCallback = {};
            
            recordingCallback.recordSuccess = handleRecordSuccess;
            recordingCallback.recordError = handleRecordError;
            
            mediaManager.startRecording(recordingCallback);
            
            var recTime = 0;
            
            document.getElementById("soundDuration").innerHTML = "Duration: " + recTime + " seconds";
            
            $("#recordSoundDialog").popup("open");
            
            recInterval = setInterval(function() {
                                         recTime = recTime + 1;
                                         document.getElementById("soundDuration").innerHTML = "Duration: " + recTime + " seconds";
                                      }, 1000);            
        });       
        
        $("#recordSoundExt").on("tap", function(e) {
            e.preventDefault();
            
            disableActionButtons();
            
            var recordingCallback = {};
            
            recordingCallback.recordSuccess = handleRecordSuccess;
            recordingCallback.recordError = handleRecordError;
            
            mediaManager.recordVoiceExternally(recordingCallback);         
        });
        
        $("#recordSoundDialog").on("popupafterclose", function(event, ui) {
            clearInterval(recInterval);
            mediaManager.stopRecording();
        });        
        
        $("#stopRecordingSound").on("tap", function(e) {
            $("#recordSoundDialog").popup("close");
        });
        
        $("#playSound").on("tap", function(e) {
            e.preventDefault();
            
            disableActionButtons();
        
            var playCallback = {};
            
            playCallback.playSuccess = handlePlaySuccess;
            playCallback.playError = handlePlayError;
            
            mediaManager.playVoice($("#location").val(), playCallback);
        });      
        
        initPage();
    });
    
    $(document).on("pagebeforehide", "#media", function(e) {
    	
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
