apiclient=(function(){

    var getBlueprintsByAuthor = function(authname,callback){
                $.get("http://localhost:8080/blueprints/"+authname, function(data) {
                    callback(JSON.parse(JSON.stringify(data, null, 2)));
                });
    		};

    var getBlueprintsByNameAndAuthor = function(authname,bpname,callback){
            $.get("http://localhost:8080/blueprints/"+authname+"/"+bpname, function(data) {
                callback(JSON.parse(JSON.stringify(data, null, 2)));
            });
        };

	return {
		getBlueprintsByAuthor:getBlueprintsByAuthor,
		getBlueprintsByNameAndAuthor:getBlueprintsByNameAndAuthor
	};

})();
