//Singleton Object
var CameraManager = (function () {     
  var instance;
 
  function createObject() {
      var fileManager = FileManager.getInstance();      
      
      return {
          getPicture: function (callback, fromGallery) {      
              var source = Camera.PictureSourceType.CAMERA;
              
              if (fromGallery) {
                  source = Camera.PictureSourceType.PHOTOLIBRARY;  
              }
              
              navigator.camera.getPicture(callback.onSuccess, 
                                          callback.onError, 
                                          { 
                                              quality: 80,
                                              destinationType: Camera.DestinationType.FILE_URI, 
                                              sourceType: source,
                                              correctOrientation: true 
                                          });              
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