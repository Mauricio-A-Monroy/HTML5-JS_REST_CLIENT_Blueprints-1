# Ejercicio: Diseño de un Cliente Web Básico

### Escuela Colombiana de Ingeniería
### Arquiecturas de Software

### Mauricio Monroy y Samuel Rojas

## Descripción
El objetivo de este ejercicio es diseñar un cliente web básico utilizando los lenguajes **HTML**, **JavaScript** y **CSS**.

## Funcionamiento Cliente Web

Se ingresa a la página a través del enlace http://localhost:8080/index.html. Los autores disponibles para buscar son Carlos y Felipe, si se quiere obtener los planos de alguno de ellos, se coloca su nombre en el input disponible para el autor y luego se presiona el botón "Get Blueprints".

![image](https://github.com/user-attachments/assets/1f6ccfd5-403c-4f54-b788-540e6a5f50f9)

Una vez cargados los planos, se puede observar cada uno de ellos al presionar el botón "Open" al lado del plano a elegir y se desplegará en el Canvas el dibujo de este junto con un nuevo botón en caso de que se quiera eliminarlo.

![image](https://github.com/user-attachments/assets/516c5abd-b3e6-4dca-b0dd-799ced8ca4be)

Si se quiere modificar el plano, se debe presionar directamente sobre el Canvas los nuevos puntos que se quieren añadir y luego se pulsa el botón "Save/Update Blueprint". Esto también actualizará los puntos totales de los planos del autor.

![image](https://github.com/user-attachments/assets/164d558e-007e-4a24-a82e-e85d91280c01)
![image](https://github.com/user-attachments/assets/d28dfe59-4c7b-46f7-aee0-b3243f473369)

Para eliminar un plano, primero se debe abrir el plano a eliminar y luego pulsar el botón "Delete Blueprint". 

![image](https://github.com/user-attachments/assets/4a0e03c8-b613-4237-ad38-4febd4c50f51)
![image](https://github.com/user-attachments/assets/4683c522-6c72-4038-b7fd-742b0d040946)

Finalmente, si se quiere crear un nuevo plano se tiene que buscar primero a un autor, ya que no permitimos la opción de agregar nuevos a nuestra API, luego se presiona el botón "Create Blueprint", se elige el nombre del plano a crear, se dibuja sobre el canvas al menos dos puntos (una línea) para poder guardar el plano y por último se presiona el botón "Save/Update Blueprint".

![image](https://github.com/user-attachments/assets/926ecbf9-238d-4bdb-a8f4-8c0c33d89b2a)
![image](https://github.com/user-attachments/assets/2c9668e4-2dca-42cb-9c36-a8939d457e3c)
![image](https://github.com/user-attachments/assets/1de0641d-dbba-4c72-b040-0f7294957b1b)

## Construción de un cliente 'grueso' con un API REST, HTML5, Javascript y CSS3. Parte I.

### Trabajo individual o en parejas. A quienes tuvieron malos resultados en el parcial anterior se les recomienda hacerlo individualmente.

![](img/mock.png)

* Al oprimir 'Get blueprints', consulta los planos del usuario dado en el formulario. Por ahora, si la consulta genera un error, sencillamente no se mostrará nada.
* Al hacer una consulta exitosa, se debe mostrar un mensaje que incluya el nombre del autor, y una tabla con: el nombre de cada plano de autor, el número de puntos del mismo, y un botón para abrirlo. Al final, se debe mostrar el total de puntos de todos los planos (suponga, por ejemplo, que la aplicación tienen un modelo de pago que requiere dicha información).
* Al seleccionar uno de los planos, se debe mostrar el dibujo del mismo. Por ahora, el dibujo será simplemente una secuencia de segmentos de recta realizada en el mismo orden en el que vengan los puntos.


## Ajustes Backend

1. Trabaje sobre la base del proyecto anterior (en el que se hizo el API REST).
2. Incluya dentro de las dependencias de Maven los 'webjars' de jQuery y Bootstrap (esto permite tener localmente dichas librerías de JavaScript al momento de construír el proyecto):

    ```xml
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>webjars-locator</artifactId>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>bootstrap</artifactId>
        <version>3.3.7</version>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>jquery</artifactId>
        <version>3.1.0</version>
    </dependency>                

    ```

## Front-End - Vistas

1. Cree el directorio donde residirá la aplicación JavaScript. Como se está usando SpringBoot, la ruta para poner en el mismo contenido estático (páginas Web estáticas, aplicaciones HTML5/JS, etc) es:  

    ```
    src/main/resources/static
    ```

4. Cree, en el directorio anterior, la página index.html, sólo con lo básico: título, campo para la captura del autor, botón de 'Get blueprints', campo <div> donde se mostrará el nombre del autor seleccionado, [la tabla HTML](https://www.w3schools.com/html/html_tables.asp) donde se mostrará el listado de planos (con sólo los encabezados), y un campo <div> donde se mostrará el total de puntos de los planos del autor. Recuerde asociarle identificadores a dichos componentes para facilitar su búsqueda mediante selectores.


```html               
    <!DOCTYPE html>
<html>
<head>
    <title>Blueprints</title>
</head>
    <body onload="app.initCanvas()">
        <div class="grid-container">
            <h1 id="title">Blueprints</h1>

            <div class="author-section">
                <label id="author">Author</label>
                <input type="text" id="name" name="name" size="10" />
                <button type="button" id="getButton">Get Blueprints</button>
            </div>

            <div class="author-table">
                <h2 id="selectedAuthor"></h2>
                <table id="blueprintTable">
                    <thead>
                        <tr>
                            <th>Blueprint name</th>
                            <th>Number of points</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <p id="userPoints">Total user points: </p>
            </div>
        </div>
    </body>
</html>
```
5. En el elemento \<head\> de la página, agregue las referencia a las librerías de jQuery, Bootstrap y a la hoja de estilos de Bootstrap. 
    ```html
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script src="/webjars/jquery/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet"
          href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
    </head>
    ```


5. Suba la aplicación (mvn spring-boot:run), y rectifique:
    1. Que la página sea accesible desde:
    ```
    http://localhost:8080/index.html
    ```
    2. Al abrir la consola de desarrollador del navegador, NO deben aparecer mensajes de error 404 (es decir, que las librerías de JavaScript se cargaron correctamente).


    ![image](https://github.com/user-attachments/assets/9eb5fb78-89e4-43e1-8e9c-4cb0ca0a4f1c)

## Front-End - Lógica

1. Ahora, va a crear un Módulo JavaScript que, a manera de controlador, mantenga los estados y ofrezca las operaciones requeridas por la vista. Para esto tenga en cuenta el [patrón Módulo de JavaScript](https://toddmotto.com/mastering-the-module-pattern/), y cree un módulo en la ruta static/js/app.js .

2. Copie el módulo provisto (apimock.js) en la misma ruta del módulo antes creado. En éste agréguele más planos (con más puntos) a los autores 'quemados' en el código.


```javascript
    var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":40,"y":20},{"x":150,"y":15}],"name":"gear"},
	 {author:"johnconnor","points":[{"x":20,"y":30},{"x":150,"y":170}, {"x":200,"y":120}, {"x":60,"y":8}],"name":"car"}];

	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"},
	 {author:"maryweyland","points":[{"x":62,"y":54},{"x":220,"y":250}, {"x":70,"y":25}, {"x":39,"y":47}, {"x":162,"y":245}],"name":"car2"}];

```

3. Agregue la importación de los dos nuevos módulos a la página HTML (después de las importaciones de las librerías de jQuery y Bootstrap):
    ```html
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
    ```

3. Haga que el módulo antes creado mantenga de forma privada:
    * El nombre del autor seleccionado.
    * El listado de nombre y tamaño de los planos del autor seleccionado. Es decir, una lista objetos, donde cada objeto tendrá dos propiedades: nombre de plano, y número de puntos del plano.

    Junto con una operación pública que permita cambiar el nombre del autor actualmente seleccionado.



```javascript
var app = (function(){

   var author = "";

   var setAuthor = function (newAuthor) {
        author = newAuthor;
        $('#selectedAuthor').text(author + "'s Blueprints");
   };

   return {
       setAuthor,
     };

})();
```
4. Agregue al módulo 'app.js' una operación pública que permita actualizar el listado de los planos, a partir del nombre de su autor (dado como parámetro). Para hacer esto, dicha operación debe invocar la operación 'getBlueprintsByAuthor' del módulo 'apimock' provisto, enviándole como _callback_ una función que:

    * Tome el listado de los planos, y le aplique una función 'map' que convierta sus elementos a objetos con sólo el nombre y el número de puntos.

    * Sobre el listado resultante, haga otro 'map', que tome cada uno de estos elementos, y a través de jQuery agregue un elemento \<tr\> (con los respectvos \<td\>) a la tabla creada en el punto 4. Tenga en cuenta los [selectores de jQuery](https://www.w3schools.com/JQuery/jquery_ref_selectors.asp) y [los tutoriales disponibles en línea](https://www.tutorialrepublic.com/codelab.php?topic=faq&file=jquery-append-and-remove-table-row-dynamically). Por ahora no agregue botones a las filas generadas.

    * Sobre cualquiera de los dos listados (el original, o el transformado mediante 'map'), aplique un 'reduce' que calcule el número de puntos. Con este valor, use jQuery para actualizar el campo correspondiente dentro del DOM.



```javascript
var app = (function(){

   var author = "";

   var setAuthor = function (newAuthor) {
        author = newAuthor;
        $('#selectedAuthor').text(author + "'s Blueprints");
   };

   var getBlueprintsByAuthor = function(author){
        apimock.getBlueprintsByAuthor(author, updateTable);
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

   return {
       setAuthor,
       getBlueprintsByAuthor
     };

})();
```

5. Asocie la operación antes creada (la de app.js) al evento 'on-click' del botón de consulta de la página.

6. Verifique el funcionamiento de la aplicación. Inicie el servidor, abra la aplicación HTML5/JavaScript, y rectifique que al ingresar un usuario existente, se cargue el listado del mismo.

## Para la próxima semana

8. A la página, agregue un [elemento de tipo Canvas](https://www.w3schools.com/html/html5_canvas.asp), con su respectivo identificador. Haga que sus dimensiones no sean demasiado grandes para dejar espacio para los otros componentes, pero lo suficiente para poder 'dibujar' los planos.


![image](https://github.com/user-attachments/assets/eaf7d897-d741-4182-bb32-3c33ef81ee8e)


```html
    <div class="blueprint-display">
        <h2 id="blueprintTitle">Current Blueprint: </h2>
        <canvas id="myCanvas" width="600" height="400" style="border:1px solid #d3d3d3;"></canvas>
        <br>
    </div>
```

9. Al módulo app.js agregue una operación que, dado el nombre de un autor, y el nombre de uno de sus planos dados como parámetros, haciendo uso del método getBlueprintsByNameAndAuthor de apimock.js y de una función _callback_:
    * Consulte los puntos del plano correspondiente, y con los mismos dibuje consectivamente segmentos de recta, haciendo uso [de los elementos HTML5 (Canvas, 2DContext, etc) disponibles](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_canvas_tut_path)* Actualice con jQuery el campo <div> donde se muestra el nombre del plano que se está dibujando (si dicho campo no existe, agruéguelo al DOM).


```javascript
    var getBlueprintsByNameAndAuthor = function(author, name){
        api.getBlueprintsByNameAndAuthor(author, name, drawBlueprint);
   };

    var drawBlueprint = function(blueprint){
         points = blueprint.points;
         $('#blueprintTitle').text("Current Blueprint: " + blueprint.name);
         const c = document.getElementById("myCanvas");
         const ctx = c.getContext("2d");
         clearCanvas();
        
         const rect = c.getBoundingClientRect();
        
         if(points.length != 0){
            ctx.beginPath();
            ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
            for (var i = 1 ; i < blueprint.points.length ; i++){
                ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
                ctx.moveTo(blueprint.points[i].x, blueprint.points[i].y);
            }
            ctx.stroke();
         }
    
      };
```

10. Verifique que la aplicación ahora, además de mostrar el listado de los planos de un autor, permita seleccionar uno de éstos y graficarlo. Para esto, haga que en las filas generadas para el punto 5 incluyan en la última columna un botón con su evento de clic asociado a la operación hecha anteriormente (enviándo como parámetro los nombres correspondientes).


![image](https://github.com/user-attachments/assets/df78934c-b285-426e-aeb9-85868c47ce30)

11. Verifique que la aplicación ahora permita: consultar los planos de un auto y graficar aquel que se seleccione.


![image](https://github.com/user-attachments/assets/541a3fd1-37a5-499a-9dbc-39e8355c0c96)
![image](https://github.com/user-attachments/assets/7c390fda-5f73-44b5-9dc7-92a2642c81c3)


12. Una vez funcione la aplicación (sólo front-end), haga un módulo (llámelo 'apiclient') que tenga las mismas operaciones del 'apimock', pero que para las mismas use datos reales consultados del API REST. Para lo anterior revise [cómo hacer peticiones GET con jQuery](https://api.jquery.com/jquery.get/), y cómo se maneja el esquema de _callbacks_ en este contexto.


```javascript
apiclient=(function(){

    var getBlueprintsByAuthor = function(authname, callback){
        $.get("http://localhost:8080/blueprints/"+authname);
    };

   var getBlueprintsByNameAndAuthor = function(authname, bpname, callback){
       var promise = $.get("http://localhost:8080/blueprints/"+authname+"/"+bpname)
    };

	return {
		getBlueprintsByAuthor,
		getBlueprintsByNameAndAuthor,
	};

})();
```
13. Modifique el código de app.js de manera que sea posible cambiar entre el 'apimock' y el 'apiclient' con sólo una línea de código.


```javascript
    var api = apiclient;

    var getBlueprintsByAuthor = function(author){
        api.getBlueprintsByAuthor(author, updateTable);
        setAuthor(author);
   };

    var getBlueprintsByNameAndAuthor = function(author, name){
        api.getBlueprintsByNameAndAuthor(author, name, drawBlueprint);
   };

    var drawBlueprint = function(blueprint){
         points = blueprint.points;
         $('#blueprintTitle').text("Current Blueprint: " + blueprint.name);
         const c = document.getElementById("myCanvas");
         const ctx = c.getContext("2d");
         clearCanvas();

         const rect = c.getBoundingClientRect();

         if(points.length != 0){
            ctx.beginPath();
            ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
            for (var i = 1 ; i < blueprint.points.length ; i++){
                ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
                ctx.moveTo(blueprint.points[i].x, blueprint.points[i].y);
            }
            ctx.stroke();
         }

  };
```
14. Revise la [documentación y ejemplos de los estilos de Bootstrap](https://v4-alpha.getbootstrap.com/examples/) (ya incluidos en el ejercicio), agregue los elementos necesarios a la página para que sea más vistosa, y más cercana al mock dado al inicio del enunciado.

## Parte II

1. Agregue al canvas de la página un manejador de eventos que permita capturar los 'clicks' realizados, bien sea a través del mouse, o a través de una pantalla táctil. Para esto, tenga en cuenta [este ejemplo de uso de los eventos de tipo 'PointerEvent'](https://mobiforge.com/design-development/html5-pointer-events-api-combining-touch-mouse-and-pen) (aún no soportado por todos los navegadores) para este fin. Recuerde que a diferencia del ejemplo anterior (donde el código JS está incrustado en la vista), se espera tener la inicialización de los manejadores de eventos correctamente modularizado, tal [como se muestra en este codepen](https://codepen.io/hcadavid/pen/BwWbrw).

```javascript
	var initCanvas = function(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	if(window.PointerEvent) {
	    c.addEventListener("pointerdown", function(event){
		alert('pointerdown at '+event.pageX+','+event.pageY);
	    });
	}
	else {
	    c.addEventListener("mousedown", function(event){
		alert('mousedown at '+event.clientX+','+event.clientY); 
	    });
	}
	};
```

2. Agregue lo que haga falta en sus módulos para que cuando se capturen nuevos puntos en el canvas abierto (si no se ha seleccionado un canvas NO se debe hacer nada):
	1. Se agregue el punto al final de la secuencia de puntos del canvas actual (sólo en la memoria de la aplicación, AÚN NO EN EL API!).
	2. Se repinte el dibujo.

```javascript
	var initCanvas = function(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	if(window.PointerEvent) {
	    c.addEventListener("pointerdown", function(event){
		if(bpname != "" || createBp){
		    const rect = c.getBoundingClientRect();
		    var posX = event.clientX - Math.floor(rect.left);
		    var posY = event.clientY - Math.floor(rect.top);
		    points.push({"x": posX, "y": posY});
		    ctx.lineTo(posX, posY);
		    ctx.moveTo(posX, posY);
		    ctx.stroke();
		}
	    });
	}
	else {
	    c.addEventListener("mousedown", function(event){
		if(bpname != "" || createBp){
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
```

3. Agregue el botón Save/Update. Respetando la arquitectura de módulos actual del cliente, haga que al oprimirse el botón:
	1. Se haga PUT al API, con el plano actualizado, en su recurso REST correspondiente.
	2. Se haga GET al recurso /blueprints, para obtener de nuevo todos los planos realizados.
	3. Se calculen nuevamente los puntos totales del usuario.

	Para lo anterior tenga en cuenta:

	* jQuery no tiene funciones para peticiones PUT o DELETE, por lo que es necesario 'configurarlas' manualmente a través de su API para AJAX. Por ejemplo, para hacer una peticion PUT a un recurso /myrecurso:

	```javascript
    return $.ajax({
        url: "/mirecurso",
        type: 'PUT',
        data: '{"prop1":1000,"prop2":"papas"}',
        contentType: "application/json"
    });
    
	```
	Para éste note que la propiedad 'data' del objeto enviado a $.ajax debe ser un objeto jSON (en formato de texto). Si el dato que quiere enviar es un objeto JavaScript, puede convertirlo a jSON con: 
	
	```javascript
	JSON.stringify(objetojavascript),
	```
	* Como en este caso se tienen tres operaciones basadas en _callbacks_, y que las mismas requieren realizarse en un orden específico, tenga en cuenta cómo usar las promesas de JavaScript [mediante alguno de los ejemplos disponibles](http://codepen.io/hcadavid/pen/jrwdgK).

	app.js
	
	```javascript
		var drawBlueprint = function(blueprint){
			 points = blueprint.points;
			 $('#blueprintTitle').text("Current Blueprint: " + blueprint.name);
			 const c = document.getElementById("myCanvas");
			 const ctx = c.getContext("2d");
			 clearCanvas();
		
			 const rect = c.getBoundingClientRect();
		
			 if(points.length != 0){
				ctx.beginPath();
				ctx.moveTo(blueprint.points[0].x, blueprint.points[0].y);
				for (var i = 1 ; i < blueprint.points.length ; i++){
					ctx.lineTo(blueprint.points[i].x, blueprint.points[i].y);
					ctx.moveTo(blueprint.points[i].x, blueprint.points[i].y);
				}
				ctx.stroke();
			 }
		
		};
		
		var updateTable = function(authorsBlueprints){
			 $('#blueprintTable tbody').empty()
			 blueprints = authorsBlueprints.map(bp => ({name: bp.name, numberOfPoints: bp.points.length}));
			 blueprints.map(
				 bp => {
					var markup = "<tr><td>" + bp.name + "</td><td>" + bp.numberOfPoints + "</td> + <td><button type='button' class='openButton' onclick=\"app.getBlueprintsByNameAndAuthor('"+author+"','"+bp.name+"')\">Open</button></td></tr>";
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
		
		var saveBlueprint = function(){
			var promise = api.updateBlueprint(author, bpname, points);
			promise.then(() => api.getBlueprintsByAuthor(author, updateTable))
				   .then(() => api.getBlueprintsByNameAndAuthor(author, bpname, drawBlueprint));
		};
	```
	
	apiclient.js
	
	```javascript
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
	```
 
	index.html
   ```html
      <div class="button-container">
      		<button type="button" id="saveButton" onclick="app.saveBlueprint()">Save/Update Blueprint</button>
      </div>
   ```


4. Agregue el botón 'Create new blueprint', de manera que cuando se oprima: 
	* Se borre el canvas actual.
	* Se solicite el nombre del nuevo 'blueprint' (usted decide la manera de hacerlo).
	
	Esta opción debe cambiar la manera como funciona la opción 'save/update', pues en este caso, al oprimirse la primera vez debe (igualmente, usando promesas):

	1. Hacer POST al recurso /blueprints, para crear el nuevo plano.
	2. Hacer GET a este mismo recurso, para actualizar el listado de planos y el puntaje del usuario.

	app.js

   ```javascript
	var createBp = false;

	var createBlueprint = function(){
		createBp = true;
		clearCanvas();
		points = [];
		if($("#blueprintName").length == 0){
			var inputElement = $('<input>', {
				type: 'text',
				id: 'blueprintName',
				placeholder: 'Ingrese el nombre del plano',
				size: 30
			});
			$(".create-blueprint").append(inputElement);
		}
	};
   
	var saveBlueprint = function(){
		var promise;
		if(createBp){
			bpname = $('#blueprintName').val();

			if (points.length < 2) {
				alert("Error: El plano debe tener al menos dos puntos.");
				return;
			}
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
   ```

	apiclient.js

   ```javascript
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
   ```

	index.html

   ```javascript
	<div class="create-blueprint">
		<button type="button" id="createButton" onclick="app.createBlueprint()">Create Blueprint</button>
	</div>
   ```

   5. Agregue el botón 'DELETE', de manera que (también con promesas):
       * Borre el canvas.
       * Haga DELETE del recurso correspondiente.
       * Haga GET de los planos ahora disponibles.

      app.js

      ```javascript
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
			$(".button-container").append(deleteButton);
		}
		api.getBlueprintsByNameAndAuthor(author, name, drawBlueprint);
		};
		
		var deleteBlueprint = function(){
		     clearCanvas();
		     var promise = api.deleteBlueprint(author, bpname);
		     promise.then(() => api.getBlueprintsByAuthor(author, updateTable));
		     $('#deleteButton').remove();
		};
      ```

      apiclient.js

      ```javascript
		var deleteBlueprint = function(author, bpname){
		   var promise = $.ajax({
		       url: 'http://localhost:8080/blueprints/' + author + "/" + bpname,
		       type: 'DELETE'
		   })
		   return promise;
		}
      ```

### Criterios de evaluación

1. Funcional
	* La aplicación carga y dibuja correctamente los planos.
	* La aplicación actualiza la lista de planos cuando se crea y almacena (a través del API) uno nuevo.
	* La aplicación permite modificar planos existentes.
	* La aplicación calcula correctamente los puntos totales.
2. Diseño
	* Los callback usados al momento de cargar los planos y calcular los puntos de un autor NO hace uso de ciclos, sino de operaciones map/reduce.
	* Las operaciones de actualización y borrado hacen uso de promesas para garantizar que el cálculo del puntaje se realice sólo hasta cando se hayan actualizados los datos en el backend. Si se usan callbacks anidados se evalúa como R.

## Entrega
- Deben entregar el código fuente completo y un archivo **README** explicando el funcionamiento de su cliente web.
- Asegúrense de probar su proyecto en diferentes navegadores para verificar su compatibilidad.
  
El plazo de entrega es el descrito en la tarea de teams.

¡Éxito con el desarrollo de su cliente web!
