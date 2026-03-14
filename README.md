Actividad: Construcción de una Aplicación Web Modularizada
⏰ Duración: Desde el 23 de septiembre hasta el 30 de septiembre a las 6 pm
 👥 Trabajo en grupo: 2 estudiantes subiendo el link del repositorio a la uvirtual 
 🛠️ Evidencia de trabajo: Repositorio en GitHub con el nombre de Primer-parcial-desarrollo-web
 🎯 Enfoque: Modularización y componentización en HTML, CSS y JS

📖 Descripción de la actividad
Durante este tiempo los estudiantes, en grupos de dos personas, desarrollarán una aplicación web modularizada. La aplicación integrará componentes reutilizables, validaciones de formulario y buenas prácticas de desarrollo.
Cada grupo deberá:
Escoger un tipo de negocio (ejemplo: tienda de ropa, librería, cafetería, electrónica, etc.).
Definir colores y estilos CSS personalizados.
Subir el proyecto a un repositorio en GitHub para evidenciar el trabajo en equipo (commits, ramas, pull requests).

🔹 Lo que deben desarrollar (Requerimientos funcionales)
Preparación del proyecto
Crear una estructura de carpetas organizada que separe HTML, CSS, JS y datos.
Incluir un documento en el repositorio explicando qué es la modularización y su importancia en el desarrollo web.
Ejemplo:



Formulario de inicio de sesión


Crear una página de login con usuario y contraseña.
Implementar validación en JavaScript usando credenciales quemadas en el código (por ejemplo, un usuario y contraseña predeterminados).
Si el login es correcto, redirige al usuario a la página principal(index.html); en caso contrario, mostrar un mensaje de error.
Aclarar en el README que esto es solo con fines educativos y no es seguro en aplicaciones reales.


Fragmentos reutilizables


Crear los archivos para el encabezado, pie de página y barra lateral o panel lateral de la aplicación web como fragmentos separados en la carpeta de componentes.
Configurar la aplicación para que estos fragmentos se carguen dinámicamente en la página principal usando JavaScript.
El header debe contener el nombre del negocio, el footer los derechos reservados y el sidebar un menú lateral con enlaces.


Página principal modular


Integrar el header, footer y sidebar en la página principal junto con una sección central de contenido.
Asegurar que todos los elementos cargados dinámicamente funcionen correctamente y se mantenga la coherencia en el diseño.


Plantillas con <template>
Definir una plantilla de producto/servicio en el HTML principal.
Usar JavaScript para crear al menos tres productos dinámicos basados en esa plantilla.
Asegurar que los productos se muestren correctamente en la sección de contenido principal.


Uso de datos externos con fetch
Crear un archivo JSON llamado products.json almacenado en la carpeta data con información de productos o servicios.
Cargar los productos de manera dinámica utilizando la API Fetch en JavaScript.
Mostrar los productos en la aplicación reemplazando el uso de arrays estáticos en el código.


Web Components personalizados


Crear un componente web para cargar productos que reciban atributos como nombre, precio, descripción e imagen.
Encapsular su estructura y estilos utilizando el Shadow DOM.
Reemplazar parte de la renderización tradicional de productos por el uso de este nuevo componente personalizado.


Integración general


Asegurar que la aplicación final combine todos los elementos anteriores:
Login funcional con validación.
Header, sidebar y footer cargados como fragmentos.
Listado de productos a partir de plantillas y datos en JSON.
Productos renderizados también con el Web Component
Aplicar los colores y estilos CSS definidos por el grupo, manteniendo coherencia visual en toda la aplicación.


Buenas prácticas de nombramiento y formato


Usar nombres consistentes para variables, clases y funciones.
Aplicar convenciones como camelCase para variables y funciones en JavaScript, y kebab-case para clases CSS.
Mantener el código correctamente indentado y con comentarios donde sea necesario.
Separar las responsabilidades en distintos archivos: uno para el login, otro para la lógica principal y otro para los estilos.

Documentación y sustentación


Documentar en el README.md:
Explicación de qué son fragmentos, plantillas y Web Components.
Cómo se implementó el formulario de inicio de sesión.
Qué buenas prácticas se aplicaron.
Evidencia de colaboración en GitHub.
Realizar una sustentación de 10 minutos donde se muestre la aplicación en funcionamiento y se respondan preguntas técnicas.

📊 Rúbrica de Evaluación
Criterio
Descripción
Peso
Estructura y modularización del proyecto y Trabajo colaborativo
Organización clara de carpetas y separación de archivos. Evidencia de commits, ramas y pull requests.
5%
Formulario de inicio de sesión
Implementación de login con validación genérica en JS.
10%
Uso de plantillas con <template>
Renderización de productos usando plantillas.
10%
Uso de datos externos (fetch + JSON)
Carga dinámica de productos desde un archivo externo.
10%
Web Components
Implementación con Shadow DOM y atributos.
10%
Estilos y consistencia visual
Aplicación de estilos CSS definidos por el grupo de forma coherente.
10%
Buenas prácticas de nombramiento y formato
Aplicación de convenciones de nombres y estilo de código.
5%
Sustentación técnica
Presentación clara y respuestas correctas a preguntas.
40%

## Explicación de Conceptos Implementados

### Modularización
La modularización en desarrollo web se refiere a dividir el código en módulos independientes y reutilizables. Esto facilita el mantenimiento, la escalabilidad y la colaboración. En este proyecto, hemos separado HTML, CSS y JS en carpetas distintas, y hemos creado fragmentos reutilizables para header, footer y sidebar.

### Fragmentos Reutilizables
Los fragmentos son partes de HTML que se cargan dinámicamente usando JavaScript y fetch. Esto permite reutilizar componentes como el header y footer en múltiples páginas sin duplicar código.

### Plantillas con <template>
Las plantillas permiten definir estructuras HTML que no se renderizan inicialmente, pero se pueden clonar y poblar dinámicamente con JavaScript. Usamos una plantilla para renderizar algunos productos.

### Web Components
Los Web Components son elementos personalizados que encapsulan funcionalidad y estilos usando Shadow DOM. Creamos un componente `movie-product` que recibe atributos y renderiza productos de manera encapsulada.

### Formulario de Inicio de Sesión
El login usa validación en JavaScript con credenciales quemadas (usuario: admin, contraseña: admin). Esto es solo educativo; en producción, se usaría autenticación segura.

### Buenas Prácticas Aplicadas
- Nombres en camelCase para variables y funciones JS.
- Clases CSS en kebab-case.
- Código indentado y comentado.
- Separación de responsabilidades: login.js para login, main.js para lógica principal, styles.css para estilos.

### API de Películas
Usamos la API OMDB para obtener datos de películas. Los productos en products.json están basados en películas populares. Para usar la API en tiempo real, reemplaza [yourkey] con tu clave API en el código (aunque en este proyecto usamos datos estáticos para simplicidad).

api de peliculas

Usage
Send all data requests to:

http://www.omdbapi.com/?apikey=[yourkey]&

Poster API requests:

http://img.omdbapi.com/?apikey=[yourkey]&
Parameters
By ID or Title
Parameter	Required	Valid Options	Default Value	Description
i	Optional*		<empty>	A valid IMDb ID (e.g. tt1285016)
t	Optional*		<empty>	Movie title to search for.
type	No	movie, series, episode	<empty>	Type of result to return.
y	No		<empty>	Year of release.
plot	No	short, full	short	Return short or full plot.
r	No	json, xml	json	The data type to return.
callback	No		<empty>	JSONP callback name.
v	No		1	API version (reserved for future use).
*Please note while both "i" and "t" are optional at least one argument is required.
By Search
Parameter	Required	Valid options	Default Value	Description
s	Yes		<empty>	Movie title to search for.
type	No	movie, series, episode	<empty>	Type of result to return.
y	No		<empty>	Year of release.
r	No	json, xml	json	The data type to return.
page New!	No	1-100	1	Page number to return.
callback	No		<empty>	JSONP callback name.
v	No		1	API version (reserved for future use).
Examples
By Title
Title: 
    Year: 
    Plot: 
Short
    Response: 
JSON
    Search Reset
By ID
ID: 
IMDb ID
    Plot: 
Short
    Response: 
JSON
    Search Reset
Change Log
04/08/19
Added support for eight digit IMDb IDs.
01/20/19
Supressed adult content from search results.
01/20/19
Added Swagger files (YAML, JSON) to expose current API abilities and upcoming REST functions.
11/02/17
FREE KEYS! The "open" API is finally open again!
08/20/17
I created a GitHub repository for tracking bugs.
05/10/17
Due to some security concerns on how the keys were being distributed I updated the form to email them and also changed the algorithm used, which means your older keys not obtained through email will eventually stop working.
01/12/17
Removed single character restriction from title/search results.
06/11/16
"totalSeasons" count has been added to series results.
1/20/16
To accommodate search paging "totalResults" is now returned at the root level.
12/12/15
Search pagination added: http://www.omdbapi.com/?s=Batman&page=2
11/16/15
Season+Episode now works with "i" parameter: http://www.omdbapi.com/?i=tt0944947&Season=1
Fixed the max pool size connection issues.
10/18/15
You can now return all episodes by using just the "Season" parameter: http://www.omdbapi.com/?t=Game of Thrones&Season=1
9/9/15
New server is up, response times should be < 500ms.
Setup a CDN/Caching service with CloudFlare
8/15/15
Created and Fixed a bad parsing error with JSON response. -Sorry about that!
HTTPS (with TLS) is now active: https://www.omdbapi.com/
5/10/15
Season+Episode search parameters added: http://www.omdbapi.com/?t=Game of Thrones&Season=1&Episode=1