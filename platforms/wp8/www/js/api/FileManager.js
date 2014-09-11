//Singleton Object
var FileManager = (function () {     
  var instance;
 
  function createObject() {
      var audioMedia;
      var BASE_DIRECTORY = "CExhibition";
      var FILE_BASE = "file:///";
      
      return {
          copyFileToAppDirectory: function (filePath, cb) {                  
             var callback = {};
                
             callback.requestSuccess = function (dirEntry) {
                 if (filePath.indexOf(FILE_BASE) != 0) {
                     filePath = filePath.replace("file:/", FILE_BASE);
                 }
             
                 window.resolveLocalFileSystemURL(filePath, function(file) {
                     var filename = filePath.replace(/^.*[\\\/]/, '');
                     
                     var copyToSuccess = function (fileEntry) {
 					     console.log("file is copied to: " + fileEntry.toURL());
 					     cb.copySuccess(fileEntry.toURL());
 					 };
 					
                     file.copyTo(dirEntry, filename, copyToSuccess, cb.copyError);                     
                  }, cb.copyError);  
             };  
             
             callback.requestError = function (error) {
                 console.log(error);
             };

             this.requestApplicationDirectory(callback);                 
          },
          requestApplicationDirectory: function (callback) {
              var fileSystemReady = function(fileSystem) {
                  fileSystem.root.getDirectory(BASE_DIRECTORY, {create: true}, callback.requestSuccess);                    
              };              
              
              window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemReady, callback.requestError);
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