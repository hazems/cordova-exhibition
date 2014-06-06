(function() {
    var contactsManager = ContactsManager.getInstance();
    var watchID;
    
    $(document).on("pageinit", "#contacts", function(e) {
        e.preventDefault();
        
        $("#contactList").on("filterablebeforefilter", function (e, data) {
        	e.preventDefault();
        	
            var filterText = data.input.val();
            
            if (filterText && filterText.length > 2) {
                var callback = {};
                
                callback.onSuccess = function (contacts) {
                    updateContactsList(contacts);
                };
                
                callback.onError = function (error) {       
                    $("#contactList").empty();
                    $("<li>Error displaying contacts</li>").appendTo("#contactList");
                };        
                
                contactsManager.getAllContacts(callback, filterText);
            }
        });
    });    
    
    function updateContactsList(contacts) {
        $("#contactList").empty();
                
        if (jQuery.isEmptyObject(contacts)) {
            $("<li>No Contacts Available</li>").appendTo("#contactList");
        } else {
            var i;
            
            //Display the top 50 elements
            for (i = 0; i < contacts.length || i < 50; ++i) {
                if (contacts[i]) {
                    $("<li><a href='#contactDetails?contact=" + encodeURIComponent(JSON.stringify(contacts[i])) + "'>" + 
                            contacts[i].name.formatted + "</a></li>").appendTo("#contactList");
                }
            }
        }
        
        $("#contactList").listview('refresh');        
    }    
})();