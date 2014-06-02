//Singleton Object
var GeolocationManager = (function () {     
  var instance;
  var watchID;
 
  function createObject() {
      return {
          getCurrentPosition: function (callback) {
              watchID = navigator.geolocation.getCurrentPosition(callback.onSuccess, 
                                                                 callback.onError, 
                                                                 {
                                                                     timeout: 15000, 
                                                                     enableHighAccuracy: true 
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