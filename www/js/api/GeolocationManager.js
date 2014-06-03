//Singleton Object
var GeolocationManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          getCurrentPosition: function (callback) {
              navigator.geolocation.getCurrentPosition(callback.onSuccess, 
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