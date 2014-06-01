//Singleton Object
var CompassManager = (function () {     
  var instance;
  var watchID;
 
  function createObject() {
      return {
          startWatchHeading: function (callback) {
              watchID = navigator.compass.watchHeading(callback.onSuccess, 
                                                       callback.onError, 
                                                       {frequency: 2000});
          },
          stopWatchHeading: function () {    
              if (watchID) {
                  navigator.compass.clearWatch(watchID);
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