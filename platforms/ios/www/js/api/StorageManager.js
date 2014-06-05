//Singleton Object
var StorageManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          set: function (key, value) {
              window.localStorage.setItem(key, value);
          },
          get: function (key) {
        	  return window.localStorage.getItem(key);
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