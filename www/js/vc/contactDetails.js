(function() {    
    $(document).on("pageshow", "#contactDetails", function(e) {
        e.preventDefault();

        var contactDetailsParam = $.mobile.pageData.contact || null;
        var contactDetails = JSON.parse(decodeURIComponent(contactDetailsParam));        
        var i;
        var numbers = "";

        for (i = 0; i < contactDetails.phoneNumbers.length; ++i) {
            numbers = "<a href='tel:" + contactDetails.phoneNumbers[i].value + "'>" + 
                      contactDetails.phoneNumbers[i].value + "</a><br/>";
        }
        
        $("#contactInfo").html("<p>" +
                "Name: <strong>" + contactDetails.name.formatted + "</strong><br/><br/>" +
                "Phone(s): " + "<br/>" + 
                numbers +
                "</p>");
    });
})();