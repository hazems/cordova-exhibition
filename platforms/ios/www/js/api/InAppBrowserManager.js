var InAppBrowserManager = (function () {     
    var instance;
 
    function createObject() {
        return {
            openWindow: function (url) {
                var windowRef = window.open(url, '_blank', 'location=no');
              
                return windowRef;
            },
            closeWindow: function (windowRef) {
                if (windowRef) {
                    windowRef.close();
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