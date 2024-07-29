# API RESTful - Observaciones Astronómicas
En esta api un usuario se va a poder registrar, loguear y realizar una observación de algun cuerpo celeste que desee.
## La estructura es la siguiente:
/index.js: en este archivo va lo relacionado con el servidor. Crearlo y levantarlo.

/middlewares: una carpeta con los middlewares a utilizar.

/routes: carpeta con los endpoints.

/controllers: carpeta con la lógica de cada endpoint. Es decir, el código para manejar las rutas de las peticiones.

.env: archivo con las variables de entorno que no se deben mostrar.

## Uso
Clonar el repositorio

Instalar las dependencias : pnpm install

Iniciar el proyecto: pnpm start

- ## Leer en detalle la descripcion de los métodos, ya que indican que datos se piden.
## Endpoints

### 1. **Registrar Usuario**

- **Método:** `POST`
- **URL:** `/api/users/register`
- **Descripción:** Registra un nuevo usuario en el sistema.
- **Cuerpo (Body):**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password",
    "role": "user"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
  ```

### 2. **Iniciar Sesión**

- **Método:** `POST`
- **URL:** `/api/users/login`
- **Descripción:** Inicia sesión con un usuario existente y devuelve un token JWT.
- **Cuerpo (Body):**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Respuesta:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### 3. **Crear un Cuerpo Celeste** Este método solo lo puede realizar un 'admin'.

- **Método:** `POST`
- **URL:** `/api/celestialBodies`
- **Descripción:** Crea un nuevo cuerpo celeste en el sistema. El admin tiene que caragr todos los objetos celestes que se dea tener en la api.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Cuerpo (Body):**
  ```json
  {
    "name": "Mars"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "celestial_body_id",
    "name": "Mars"
  }
  ```

### 4. **Obtener Todos los Cuerpos Celestes**

- **Método:** `GET`
- **URL:** `/api/celestialBodies`
- **Descripción:** Obtiene todos los cuerpos celestes registrados en el sistema. Es util para que los usuarios que no son 'admin' puedan ver los cuerpos celestes cargados a los que le pueden realizar una observación.
- **Respuesta:**
  ```json
  [
    {
      "id": "celestial_body_id",
      "name": "Mars"
    },
    {
      "id": "another_celestial_body_id",
      "name": "Jupiter"
    }
  ]
  ```

### 5. **Modificar un Cuerpo Celeste**

- **Método:** `PUT`
- **URL:** `/api/celestialBodies/:id`
- **Descripción:** Actualiza un cuerpo celeste registrado en el sistema utilizando como param en la URL el ID del cuerpo celeste. Solo accesible para administradores.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Cuerpo (Body):**
  ```json
  {
    "name": "Updated name"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "celestial_body_id",
    "name": "Updated name"
  }
  ```

### 6. **Eliminar un Cuerpo Celeste (Solo Administradores)**

- **Método:** `DELETE`
- **URL:** `/api/celestialBodies/:id`
- **Descripción:** Elimina un cuerpo celeste existente; se debe poner el ID del cuerpo celeste a elimiar en la URL. Solo accesible para administradores.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Respuesta:**
  ```json
  {
    "message": "Celestial body deleted successfully"
  }
  ```

### 7. **Crear una Observación**

- **Método:** `POST`
- **URL:** `/api/observations`
- **Descripción:** Crea una nueva observación astronómica para el usuario autenticado. En este campo mi intención era poder cargar la hora de manera mas precisa y manual, ya que para la astronomía algunas cuestiones de horario y zonas son importantes. 

-Explicación del formato de la fecha

2024-08-01: La fecha (1 de agosto de 2024)

T: Separador de fecha y hora

14:30:00: La hora (2:30 PM en formato de 24 horas)

Z: Indica que la hora está en UTC (Tiempo Universal Coordinado)

- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Cuerpo (Body):**
  ```json
  {
    "date": "2024-07-28T00:00:00Z",
    "description": "Observation of Mars",
    "celestialBodyId": "id_of_the_celestial_body"
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "observation_id",
    "date": "2024-07-28T00:00:00Z",
    "description": "Observation of Mars",
    "celestialBodyId": "id_of_the_celestial_body",
    "userId": "user_id"
  }
  ```

### 8. **Obtener Todas las Observaciones del Usuario**

- **Método:** `GET`
- **URL:** `/api/observations`
- **Descripción:** Obtiene todas las observaciones realizadas por el usuario autenticado.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Respuesta:**
  ```json
  [
    {
      "id": "observation_id",
      "date": "2024-07-28T00:00:00Z",
      "description": "Observation of Mars",
      "celestialBodyId": "id_of_the_celestial_body",
      "userId": "user_id"
    }
  ]
  ```

### 9. **Actualizar una Observación**

- **Método:** `PUT`
- **URL:** `/api/observations/:id`
- **Descripción:** Actualiza una observación existente del usuario autenticado. Se debe poner en la URL el 'id' de la observación que realizó (por lo que es útil hacer la consulta 8 para ver este dato)
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Cuerpo (Body):**
  ```json
  {
    "date": "2024-07-29T00:00:00Z",
    "description": "Updated observation description",
    "celestialBodyId": "id_of_the_celestial_body" // Aquí debe ir el ID que tinen cargado los cuerpos celestes, por lo que se debera revisar cual corresponde.
  }
  ```
- **Respuesta:**
  ```json
  {
    "id": "observation_id",
    "date": "2024-07-29T00:00:00Z",
    "description": "Updated observation description",
    "celestialBodyId": "id_of_the_celestial_body",
    "userId": "user_id"
  }
  ```

### 10. **Eliminar una Observación (Solo Administradores)**

- **Método:** `DELETE`
- **URL:** `/api/observations/:id`
- **Descripción:** Elimina una observación existente con el ID que tenga esta observación como 'param' en la URL. Solo accesible para administradores.
- **Encabezados (Headers):**
  - `Authorization: Bearer your_jwt_token`
- **Respuesta:**
  ```json
  {
    "id": "observation_id",
    "message": "Observation deleted successfully"
  }
  ```
