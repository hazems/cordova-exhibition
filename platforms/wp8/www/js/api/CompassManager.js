//Singleton Object
var CompassManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          startWatchHeading: function (callback) {
              return navigator.compass.watchHeading(callback.onSuccess, 
                                                    callback.onError, 
                                                    {frequency: 2000});
          },
          stopWatchHeading: function (watchID) {    
              if (watchID) {
                  navigator.compass.clearWatch(watchID);
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