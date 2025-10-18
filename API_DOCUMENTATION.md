# Todo List API - Backend

API REST para gestión de tareas (Todo List) construida con Node.js, Express, TypeScript y PostgreSQL (Supabase).

## 🚀 Características

- ✅ CRUD completo de tareas (todos)
- ✅ Arquitectura modularizada (Controller -> Service -> Database)
- ✅ TypeScript para type-safety
- ✅ Validaciones de datos
- ✅ Manejo centralizado de errores
- ✅ Conexión a Supabase (PostgreSQL)

## 📋 Pre-requisitos

- Node.js (v16 o superior)
- npm o yarn
- Cuenta en Supabase
- Base de datos PostgreSQL configurada

## 🔧 Instalación

1. Clona el repositorio
```bash
git clone <tu-repositorio>
cd todo-list-be
```

2. Instala las dependencias
```bash
npm install
```

3. Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000

# Supabase PostgreSQL Connection
DB_USER=postgres
DB_HOST=tu-proyecto.supabase.co
DB_PASSWORD=tu-password
DB_NAME=postgres
DB_PORT=5432
```

4. Ejecuta el script SQL en Supabase

Ve a tu proyecto de Supabase > SQL Editor y ejecuta el script ubicado en `database/schema.sql`

5. Inicia el servidor de desarrollo
```bash
npm run dev
```

## 📚 Endpoints de la API

### Base URL
```
http://localhost:3000/api/todos
```

### Obtener todos los todos
```http
GET /api/todos
```

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "title": "Completar proyecto",
      "description": "Terminar el backend del todo-list",
      "completed": false,
      "created_at": "2025-10-17T10:00:00.000Z",
      "updated_at": "2025-10-17T10:00:00.000Z"
    }
  ]
}
```

### Obtener un todo por ID
```http
GET /api/todos/:id
```

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "title": "Completar proyecto",
    "description": "Terminar el backend del todo-list",
    "completed": false,
    "created_at": "2025-10-17T10:00:00.000Z",
    "updated_at": "2025-10-17T10:00:00.000Z"
  }
}
```

### Crear un nuevo todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Nueva tarea",
  "description": "Descripción opcional"
}
```

**Respuesta exitosa (201):**
```json
{
  "ok": true,
  "data": {
    "id": 2,
    "title": "Nueva tarea",
    "description": "Descripción opcional",
    "completed": false,
    "created_at": "2025-10-17T10:05:00.000Z",
    "updated_at": "2025-10-17T10:05:00.000Z"
  },
  "message": "Todo creado exitosamente"
}
```

### Actualizar un todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Tarea actualizada",
  "description": "Nueva descripción",
  "completed": true
}
```

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "title": "Tarea actualizada",
    "description": "Nueva descripción",
    "completed": true,
    "created_at": "2025-10-17T10:00:00.000Z",
    "updated_at": "2025-10-17T10:10:00.000Z"
  },
  "message": "Todo actualizado exitosamente"
}
```

### Alternar estado completado
```http
PATCH /api/todos/:id/toggle
```

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "title": "Completar proyecto",
    "description": "Terminar el backend del todo-list",
    "completed": true,
    "created_at": "2025-10-17T10:00:00.000Z",
    "updated_at": "2025-10-17T10:15:00.000Z"
  },
  "message": "Estado actualizado exitosamente"
}
```

### Eliminar un todo
```http
DELETE /api/todos/:id
```

**Respuesta exitosa (200):**
```json
{
  "ok": true,
  "message": "Todo eliminado exitosamente"
}
```

## 🏗️ Estructura del Proyecto

```
src/
├── app.ts                          # Punto de entrada
├── db.ts                           # Configuración de base de datos
├── config/
│   └── envs.ts                     # Variables de entorno
├── domain/
│   └── interfaces/
│       └── todo.interface.ts       # Interfaces y DTOs
├── middlewares/
│   └── errorsHandler.ts            # Middleware de errores
├── presentation/
│   ├── controllers/
│   │   └── todo.controller.ts      # Controlador de todos
│   ├── routes/
│   │   └── todo.routes.ts          # Rutas de todos
│   ├── routes.ts                   # Enrutador principal
│   └── server.ts                   # Configuración del servidor
└── services/
    └── todo.service.ts             # Lógica de negocio
```

## 🛠️ Scripts disponibles

```bash
# Desarrollo (con hot-reload)
npm run dev

# Compilar TypeScript
npm run build

# Producción
npm start
```

## 🔒 Manejo de Errores

La API utiliza un middleware centralizado para el manejo de errores. Todos los errores son capturados y devueltos con el siguiente formato:

```json
{
  "status": "Error",
  "message": "Descripción del error"
}
```

## 📝 Validaciones

- El campo `title` es obligatorio al crear un todo
- El campo `description` es opcional
- El `id` debe ser un número válido
- Al actualizar, se debe proporcionar al menos un campo

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## ✨ Autor

Kevin Rodriguez
