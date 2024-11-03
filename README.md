# Sprint2TP3Final
Repositorio del TP3 final del Sprint 2 - Celia Isabel Bensadón

API de Superhéroes
Esta API permite obtener información sobre superhéroes. A continuación, se describen las rutas disponibles y cómo usarlas.

Definición de Rutas
1. Obtener todos los superhéroes
Ruta: /api/heroes

Método: GET
Descripción: Retorna una lista de todos los superhéroes.

2. Obtener un superhéroe por ID
Ruta: /api/heroes/:id

Método: GET
Descripción: Retorna los detalles de un superhéroe específico basado en su ID.

3. Buscar superhéroes por atributo
Ruta: /api/heroes/buscar/:atributo/:valor

Método: GET
Descripción: Permite buscar superhéroes según un atributo específico (por ejemplo, nombre, poder, etc.) y su valor.

4. Obtener superhéroes mayores de 30 años
Ruta: /api/heroes/mayores/30

Método: GET
Descripción: Retorna una lista de superhéroes cuya edad es mayor a 30 años.
