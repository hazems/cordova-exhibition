//Singleton Object
var MediaManager = (function () {     
  var instance;
 
  function createObject() {
      var fileManager = FileManager.getInstance();   
      var recordingMedia;
      var audioMedia;
      
      return {
    	     startRecording : function (recordingCallback) {
    	         var recordVoice = function(dirEntry) {
    	             var basePath = "";
    	             var dirPath = dirEntry.toURL();
    	             
    	             if (dirPath) {
    	                 basePath = dirPath + "/";
    	             }

    	             var mediaFilePath = basePath + (new Date()).getTime() + ".wav";
    	            
    	             var recordingSuccess = function() {
    	                 recordingCallback.recordSuccess(mediaFilePath);
    	             };            
    	            
    	             recordingMedia = new Media(mediaFilePath, recordingSuccess, recordingCallback.recordError);

    	             // Record audio
    	             recordingMedia.startRecord(); 
    	         };
    	        
    	         if (device.platform === "Android") {
    	             var callback = {};
    	        
    	             callback.requestSuccess = recordVoice;              
    	             callback.requestError = recordingCallback.recordError;

    	             fileManager.requestApplicationDirectory(callback);     
    	         } else {

    	             recordVoice();
    	         }
    	    },
    	    stopRecording : function (recordingCallback) {
    	        recordingMedia.stopRecord();   
    	        recordingMedia.release();   
    	    },
    	    playVoice : function (filePath, playCallback) {
    	        if (filePath) {                  
    	            this.cleanUpResources();
    	               
    	            audioMedia = new Media(filePath, playCallback.playSuccess, playCallback.playError);
    	          
    	            // Play audio
    	            audioMedia.play();
    	        }            
    	    },  
            recordVoiceExternally: function (recordingCallback) {
                
                var recordSuccess = function(mediaFiles) {
                    if (mediaFiles && mediaFiles[0]) {        
                        var currentFilePath = mediaFiles[0].fullPath;
                        
           	            if (device.platform === "Android") {
	                        var fileCopyCallback = {};
	                        
	                        fileCopyCallback.copySuccess = function(filePath) {
	                            recordingCallback.recordSuccess(filePath);
	                        };
	                        
	                        fileCopyCallback.copyError = function(evt) {
	                            console.log("Unexpected failure of File copy due to the following error: " + evt.target.error.code);
	                        };                      
	                        
	                        fileManager.copyFileToAppDirectory(currentFilePath, fileCopyCallback);
           	            } else {
                            recordingCallback.recordSuccess(currentFilePath);
           	            }
                    }
                };
                
                navigator.device.capture.captureAudio(recordSuccess, 
                                                      recordingCallback.recordError, 
                                                      {limit: 1});
            },    	    
    	    cleanUpResources : function () {
    	        if (audioMedia) {
    	            audioMedia.stop();
    	            audioMedia.release();
    	            audioMedia = null;
    	        } 
    	        
    	        if (recordingMedia) {
    	      	    recordingMedia.stop();
    	      	    recordingMedia.release();
    	      	    recordingMedia = null;
    	        } 
    	    }
    };
  };
 
  return {
    getInstance: function () {
      if (!instance) {
          instance = createObject();
      }
 
      return instance;
    }
  }; 
})();