//Singleton Object
var AccelerometerManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          startWatchAcceleration: function (callback) {
              return navigator.accelerometer.watchAcceleration(callback.onSuccess,
                                                               callback.onError,
                                                               {frequency: 2000});
          },
          stopWatchAcceleration: function (watchID) {    
              if (watchID) {
                  navigator.accelerometer.clearWatch(watchID);
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