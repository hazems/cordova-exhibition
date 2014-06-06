(function() {
    var globalizationManager = GlobalizationManager.getInstance();
    
    $(document).on("pageinit", "#globalization", function(e) {
        e.preventDefault();
        
        $("#getLocaleName").on("tap", function(e) {
            e.preventDefault();
            
            var callback = {};
            
            callback.onSuccess = handleLocaleSuccess;
            callback.onError = handleLocaleError;            
                        
            globalizationManager.getLocaleName(callback);          
        }); 
        
        $("#getPreferredLanguage").on("tap", function(e) {
            e.preventDefault();
            
            var callback = {};
            
            callback.onSuccess = handleLangSuccess;
            callback.onError = handleLangError;            
                        
            globalizationManager.getPreferredLanguage(callback);          
        });
    });
    
    function handleLocaleSuccess(locale) {            
        $("#globInfo").html("Locale Name: " + locale.value + "<br/>");
    }
    
    function handleLocaleError() {
        $("#globInfo").html("Unable to get Locale name<br/>");
    }

    function handleLangSuccess(language) {            
        $("#globInfo").html("Preferred language name: " + language.value + "<br/");
    }
    
    function handleLangError() {
        $("#globInfo").html("Unable to get preferred language name<br/>");
    }    
})();