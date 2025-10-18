-- Script SQL para insertar datos de prueba (fake data) en la tabla todos

-- Insertar varios todos de ejemplo
INSERT INTO todos (title, description, completed, created_at, updated_at) VALUES
('Completar el proyecto de Node.js', 'Terminar la implementación del backend con Express y TypeScript', false, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
('Aprender PostgreSQL', 'Estudiar consultas avanzadas y optimización de bases de datos', true, NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days'),
('Hacer ejercicio', 'Ir al gimnasio por 1 hora', false, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('Leer documentación de TypeScript', 'Repasar los tipos avanzados y genéricos', true, NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day'),
('Preparar presentación', 'Crear slides para la reunión del equipo', false, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('Revisar pull requests', 'Revisar y aprobar los PRs pendientes del equipo', false, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('Actualizar dependencias del proyecto', 'Revisar y actualizar las versiones de npm packages', true, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('Escribir tests unitarios', 'Crear tests para el TodoService y TodoController', false, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('Configurar CI/CD', 'Implementar pipeline de integración continua con GitHub Actions', false, NOW(), NOW()),
('Documentar API', 'Completar la documentación de todos los endpoints', true, NOW(), NOW()),
('Comprar víveres', NULL, false, NOW(), NOW()),
('Llamar al dentista', 'Agendar cita para revisión dental', false, NOW(), NOW()),
('Estudiar React Hooks', 'Practicar useState, useEffect y custom hooks', false, NOW(), NOW()),
('Hacer backup de la base de datos', 'Crear respaldo semanal de la BD de producción', true, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
('Responder emails', 'Revisar y responder los emails pendientes', false, NOW(), NOW());

-- Verificar los datos insertados
SELECT * FROM todos ORDER BY created_at DESC;

-- Consulta para ver estadísticas
SELECT 
    COUNT(*) as total_todos,
    COUNT(CASE WHEN completed = true THEN 1 END) as completados,
    COUNT(CASE WHEN completed = false THEN 1 END) as pendientes,
    ROUND(COUNT(CASE WHEN completed = true THEN 1 END)::numeric / COUNT(*)::numeric * 100, 2) as porcentaje_completado
FROM todos;
