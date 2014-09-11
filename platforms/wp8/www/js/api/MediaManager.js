//Singleton Object
var MediaManager = (function () {     
  var instance;
 
  function createObject() {
      var fileManager = FileManager.getInstance();   
      var recordingMedia;
      var audioMedia;
      
      return {
             startRecording : function (callback) {
                 var recordVoice = function(dirEntry) {
                     var basePath = "";
                     
                     if (dirEntry) {
                         basePath = dirEntry.toURL() + "/";
                     }

                     var mediaFilePath = basePath + (new Date()).getTime() + ".wav";
                    
                     var recordingSuccess = function() {
                         callback.onSuccess(mediaFilePath);
                     };            
                    
                     recordingMedia = new Media(mediaFilePath, recordingSuccess, callback.onError);

                     // Record audio
                     recordingMedia.startRecord(); 
                 };
                
                 if (device.platform === "Android") {
                     var cb = {};
                
                     cb.requestSuccess = recordVoice;              
                     cb.requestError = callback.onError;

                     fileManager.requestApplicationDirectory(cb);     
                 } else {

                     recordVoice();
                 }
            },
            stopRecording : function () {
            	if (recordingMedia) {
            		recordingMedia.stopRecord();   
                	recordingMedia.release();
                	
                	recordingMedia = null;
            	}
            },
            playVoice : function (filePath, callback) {
                if (filePath) {                  
                    this.cleanUpResources();
                       
                    audioMedia = new Media(filePath, callback.onSuccess, callback.onError);
                  
                    // Play audio
                    audioMedia.play();
                }            
            },  
            recordVoiceExternally: function (callback) {
                var onSuccess = function (mediaFiles) {
                    if (mediaFiles && mediaFiles[0]) {        
                        var currentFilePath = mediaFiles[0].fullPath;
                        
	                    if (device.platform === "Android") {
	                        var fileCopyCallback = {};
	                    
	                        fileCopyCallback.copySuccess = function(filePath) {
	                            callback.onSuccess(filePath);
	                        };
	                    
	                        fileCopyCallback.copyError = function(evt) {
	                            console.log("Unexpected failure of File copy due to the following error: " + evt.target.error.code);
	                        };                      
	                    
	                        fileManager.copyFileToAppDirectory(currentFilePath, fileCopyCallback);
	                    } else {
	                        callback.onSuccess(currentFilePath);
	                    }
                    }
                };
                
                navigator.device.capture.captureAudio(onSuccess, 
                                                      callback.onError, 
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