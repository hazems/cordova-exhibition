//Singleton Object
var ConnectionManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          getCurrentConnection: function () {
              var connectionType = navigator.connection.type;

              switch(connectionType) {
                  case Connection.UNKNOWN:
                      return "Unknown connection";
                  case Connection.ETHERNET:
                      return "Ethernet connection";
                  case Connection.WIFI:
                      return "WiFi connection";
                  case Connection.CELL_2G:
                      return "Cell 2G connection";
                  case Connection.CELL_3G:
                      return "Cell 3G connection";
                  case Connection.CELL_4G:
                      return "Cell 4G connection";
                  case Connection.CELL:
                      return "Cell generic connection";
                  case Connection.NONE:
                      return "No network connection";
                  default:
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