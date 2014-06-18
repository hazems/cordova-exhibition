//Singleton Object
var ConnectionManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          getCurrentConnection: function () {
              var connectionType = navigator.connection.type;

              if (connectionType == Connection.UNKNOWN) {
                  return "Unknown connection";
              } else if (connectionType == Connection.ETHERNET) {
                  return "Ethernet connection";
              } else if (connectionType == Connection.WIFI) {
                  return "WiFi connection";
              } else if (connectionType == Connection.CELL_2G) {
                  return "Cell 2G connection";
              } else if (connectionType == Connection.CELL_3G) {
                  return "Cell 3G connection";
              } else if (connectionType == Connection.CELL_4G) {
                  return "Cell 4G connection";
              } else if (connectionType == Connection.CELL) {
                  return "Cell generic connection";
              } else if (connectionType == Connection.NONE) {
                  return "No network connection";
              } else {
                  return "Un-recognized connection";
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