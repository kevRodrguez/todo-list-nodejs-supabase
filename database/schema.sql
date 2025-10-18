-- Script SQL para crear la tabla de todos en Supabase

-- Crear la tabla todos
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para mejorar el rendimiento en consultas por completed
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);

-- Crear índice para ordenar por fecha de creación
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);

-- Comentarios para documentar la tabla
COMMENT ON TABLE todos IS 'Tabla para almacenar las tareas del todo-list';
COMMENT ON COLUMN todos.id IS 'Identificador único de la tarea';
COMMENT ON COLUMN todos.title IS 'Título de la tarea';
COMMENT ON COLUMN todos.description IS 'Descripción detallada de la tarea (opcional)';
COMMENT ON COLUMN todos.completed IS 'Estado de completado de la tarea';
COMMENT ON COLUMN todos.created_at IS 'Fecha de creación de la tarea';
COMMENT ON COLUMN todos.updated_at IS 'Fecha de última actualización de la tarea';
