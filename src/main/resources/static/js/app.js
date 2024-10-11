app=(function(){

   var author = "";
   var blueprints = [];
   var api = apiclient;

   var setAuthor = function (newAuthor) {
        author = newAuthor;
        $('#selectedAuthor').text(author + "'s Blueprints");
   };

   var getBlueprintsByAuthor = function(author){
        $('#blueprintTable tbody').empty()
        api.getBlueprintsByAuthor(author,
            function(authorsBlueprints){
                console.log(authorsBlueprints)
                blueprints = authorsBlueprints.map(bp => ({name: bp.name, numberOfPoints: bp.points.length}));
                blueprints.map(
                    bp => {
                       var markup = "<tr><td>" + bp.name + "</td><td>" + bp.numberOfPoints + "</td> + <td><button type='button' onclick=\"app.getBlueprintsByNameAndAuthor('"+author+"','"+bp.name+"')\">Open</button></td></tr>";
                       $("#blueprintTable tbody").append(markup);
                       }
                )
                var initialValue = 0;
                var sumWithInitial = blueprints.reduce(
                  (accumulator, bp) => accumulator + bp.numberOfPoints,
                  initialValue,
                );
                $('#userPoints').text("Total user points: " + sumWithInitial);

            }
        );
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
   };

   var getBlueprintsByNameAndAuthor = function(author, name){
        api.getBlueprintsByNameAndAuthor(author, name,
            function(blueprint){
                $('#blueprintTitle').text("Current Blueprint: " + blueprint.name);
                const c = document.getElementById("myCanvas");
                const ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.beginPath();
                ctx.moveTo(blueprint.points[0].x,blueprint.points[0].y);
                for (var i = 1 ; i < blueprint.points.length ; i++){
                    ctx.lineTo(blueprint.points[i].x,blueprint.points[i].y);
                    ctx.moveTo(blueprint.points[i].x,blueprint.points[i].y);
                }
                ctx.stroke();
            }
        );
   };



   return {
       setAuthor: setAuthor,
       getBlueprintsByAuthor:getBlueprintsByAuthor,
       getBlueprintsByNameAndAuthor:getBlueprintsByNameAndAuthor
     };

})();