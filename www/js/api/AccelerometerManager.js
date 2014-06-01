//Singleton Object
var AccelerometerManager = (function () {     
  var instance;
  var watchID;
 
  function createObject() {
      return {
    	  startWatchAcceleration: function (watchCallback) {
        	  watchID = navigator.accelerometer.watchAcceleration(watchCallback.watchSuccess, 
        			  								   			  watchCallback.watchError, 
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