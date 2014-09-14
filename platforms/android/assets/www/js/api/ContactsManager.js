var ContactsManager = (function () {
    var instance;
 
    function createObject() {
        return {
            getAllContacts: function (callback, filterText) {
                var options = new ContactFindOptions();
              
                options.filter = filterText || "";
                options.multiple = true;
              
                var fields = ["id", "name", "phoneNumbers"];
              
                navigator.contacts.find(callback.onSuccess, callback.onError, fields, options);
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