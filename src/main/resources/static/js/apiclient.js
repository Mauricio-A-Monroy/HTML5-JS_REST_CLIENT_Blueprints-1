apiclient=(function(){

    var getBlueprintsByAuthor = function(authname, callback){
        var promise = $.get("http://localhost:8080/blueprints/"+authname);
        promise.then(
            function(data) {
                callback(JSON.parse(JSON.stringify(data, null, 2)));
            },
            function () {
                $('#blueprintTable tbody').empty();
                location.reload();
            }
        )
        return promise;
    };

   var getBlueprintsByNameAndAuthor = function(authname, bpname, callback){
       var promise = $.get("http://localhost:8080/blueprints/"+authname+"/"+bpname)
       promise.then(
            function(data) {
                callback(JSON.parse(JSON.stringify(data, null, 2)));
            },
            function () {
                alert("Failed Name and Author!");
            }
       );
       return promise;
    };

    var updateBlueprint = function(authname, bpname, points){
        var promise = $.ajax({
            url: 'http://localhost:8080/blueprints/' + authname + "/" + bpname,
            type: 'PUT',
            data: JSON.stringify(points),
            contentType: "application/json"
        })
        return promise;
    }

    var createBlueprint = function(author, points, bpname){
        var json = JSON.stringify({ author: author, points: points, name: bpname });
        var promise = $.ajax({
            url: 'http://localhost:8080/blueprints',
            type: 'POST',
            data: json,
            contentType: "application/json"
        })
        return promise;
    }

    var deleteBlueprint = function(author, bpname){
        var promise = $.ajax({
            url: 'http://localhost:8080/blueprints/' + author + "/" + bpname,
            type: 'DELETE'
        })

        return promise;
    }

	return {
		getBlueprintsByAuthor,
		getBlueprintsByNameAndAuthor,
		updateBlueprint,
		createBlueprint,
		deleteBlueprint
	};

})();
