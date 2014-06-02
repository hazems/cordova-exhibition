//Singleton Object
var AccelerometerManager = (function () {     
  var instance;
  var watchID;
 
  function createObject() {
      return {
          startWatchAcceleration: function (callback) {
              watchID = navigator.accelerometer.watchAcceleration(callback.onSuccess, 
                                                                  callback.onError, 
                                                                  {frequency: 2000});
          },
          stopWatchAcceleration: function () {    
              if (watchID) {
                  navigator.accelerometer.clearWatch(watchID);
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