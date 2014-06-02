//Singleton Object
var NotificationManager = (function () {     
  var instance;
 
  function createObject() {
      return {
          showAlert: function (message, callback, title, buttonName) {
              navigator.notification.alert(message, callback, title, buttonName);
          },
          showConfirm: function (message, callback, title, buttonLabels) {
              navigator.notification.confirm(message, callback, title, buttonLabels);
          },
          showPrompt: function (message, callback, title, buttonLabels, defaultText) {
              navigator.notification.prompt(message, callback, title, buttonLabels, defaultText);
          },
          beep: function (times) {
              navigator.notification.beep(times);
          },
          vibrate: function (milliseconds) {
              navigator.notification.vibrate(milliseconds);
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