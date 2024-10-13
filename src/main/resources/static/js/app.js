var app = (function(){

   var author = "";
   var bpname = "";
   var blueprints = [];
   var api = apiclient;
   var points = [];
   var createBp = false;

   var setAuthor = function (newAuthor) {
        author = newAuthor;
        bpname = "";
        $('#deleteButton').remove();
        $('#selectedAuthor').text(author + "'s Blueprints");
   };

   var getBlueprintsByAuthor = function(author){
        api.getBlueprintsByAuthor(author, updateTable);
        setAuthor(author);
   };

   var updateTable = function(authorsBlueprints){
         $('#blueprintTable tbody').empty()
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
         clearCanvas();
   };

   var getBlueprintsByNameAndAuthor = function(author, name){
        bpname = name;
        if($("#deleteButton").length == 0){
            var deleteButton = $('<button>', {
                id: 'deleteButton',
                text: 'Delete Blueprint',
                click: function() {
                    deleteBlueprint();
                }
            });
            $("body").append(deleteButton);
        }
        api.getBlueprintsByNameAndAuthor(author, name, drawBlueprint);
   };

   var drawBlueprint = function(blueprint){
         points = blueprint.points;
         $('#blueprintTitle').text("Current Blueprint: " + blueprint.name);
         const c = document.getElementById("myCanvas");
         const ctx = c.getContext("2d");
         clearCanvas();
         ctx.moveTo(blueprint.points[0].x,blueprint.points[0].y);
         for (var i = 1 ; i < blueprint.points.length ; i++){
             ctx.lineTo(blueprint.points[i].x,blueprint.points[i].y);
             ctx.moveTo(blueprint.points[i].x,blueprint.points[i].y);
         }
         ctx.stroke();
  };

  var clearCanvas = function(){
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
  };

   var initCanvas = function(){
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        if(window.PointerEvent) {
            c.addEventListener("pointerdown", function(event){
                if(bpname != ""){
                    const rect = c.getBoundingClientRect();
                    var posX = event.pageX - Math.floor(rect.left);
                    var posY = event.pageY - Math.floor(rect.top);
                    points.push({"x": posX, "y": posY});
                    ctx.lineTo(posX, posY);
                    ctx.moveTo(posX, posY);
                    ctx.stroke();
                }
            });
        }
        else {
            c.addEventListener("mousedown", function(event){
                if(bpname != ""){
                    const rect = c.getBoundingClientRect();
                    var posX = event.pageX - Math.floor(rect.left);
                    var posY = event.pageY - Math.floor(rect.top);
                    points.push({"x": posX, "y": posY});
                    ctx.lineTo(posX, posY);
                    ctx.moveTo(posX, posY);
                    ctx.stroke();
                }
            });
        }
   };

   var saveBlueprint = function(){
        var promise;
        if(createBp){
            bpname = $('#blueprintName').val();
            promise = api.createBlueprint(author, points, bpname);
            createBp = false;
            $('#blueprintName').remove();
        }
        else{
            promise = api.updateBlueprint(author, bpname, points);
        }
        promise.then(() => api.getBlueprintsByAuthor(author, updateTable))
               .then(() => api.getBlueprintsByNameAndAuthor(author, bpname, drawBlueprint));
   };

   var createBlueprint = function(){
        createBp = true;
        clearCanvas();
        points = [];
        var inputElement = $('<input>', {
            type: 'text',
            id: 'blueprintName',
            placeholder: 'Ingrese el nombre del plano'
        });
        $("body").append(inputElement);
   };

   var deleteBlueprint = function(){
        clearCanvas();
        var promise = api.deleteBlueprint(author, bpname);
        promise.then(() => api.getBlueprintsByAuthor(author, updateTable));
        $('#deleteButton').remove();
   };

   return {
       setAuthor,
       getBlueprintsByAuthor,
       getBlueprintsByNameAndAuthor,
       initCanvas,
       saveBlueprint,
       createBlueprint,
       deleteBlueprint
     };

})();