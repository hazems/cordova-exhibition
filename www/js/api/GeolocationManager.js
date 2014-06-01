//Singleton Object
var GeolocationManager = (function () {     
  var instance;
  var watchID;
 
  function createObject() {
      return {
          startWatchPosition: function (watchCallback) {
        	  watchID = navigator.geolocation.watchPosition(watchCallback.watchSuccess, 
        			  								        watchCallback.watchError, 
        			  								        {frequency: 2000});
          },
          stopWatchPosition: function () {    
              if (watchID) {
            	  navigator.geolocation.clearWatch(watchID);
                  watchID = null;
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