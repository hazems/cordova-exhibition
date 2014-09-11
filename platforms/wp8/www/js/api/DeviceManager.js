//Singleton Object
var DeviceManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          getDeviceInfo: function () {
              return "Device Model: "    + device.model    + "<br />" +
                     "Device Cordova: " + device.cordova   + "<br />" +
                     "Device Platform: " + device.platform + "<br />" +
                     "Device UUID: "     + device.uuid     + "<br />" +
                     "Device Version: "  + device.version  + "<br />";
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