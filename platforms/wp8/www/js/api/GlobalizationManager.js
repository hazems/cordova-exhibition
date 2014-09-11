//Singleton Object
var GlobalizationManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          getLocaleName: function (callback) {
              navigator.globalization.getLocaleName(callback.onSuccess, 
                                                    callback.onError);
          },
          getPreferredLanguage: function (callback) {    
              navigator.globalization.getPreferredLanguage(callback.onSuccess, 
                                                           callback.onError);              
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