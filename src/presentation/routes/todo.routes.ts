import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { TodoService } from '../../services/todo.service';

export class TodoRoutes {

    static get routes(): Router {
        const router = Router();

        // Instanciar el servicio y el controlador
        const todoService = new TodoService();
        const todoController = new TodoController(todoService);

        /**
         * Rutas de Todos
         */

        // GET /api/todos - Obtener todos los todos
        router.get('/', todoController.getAllTodos);

        // GET /api/todos/:id - Obtener un todo por ID
        router.get('/:id', todoController.getTodoById);

        // POST /api/todos - Crear un nuevo todo
        router.post('/', todoController.createTodo);

        // PUT /api/todos/:id - Actualizar un todo
        router.put('/:id', todoController.updateTodo);

        // PATCH /api/todos/:id/toggle - Alternar estado completado
        router.patch('/:id/toggle', todoController.toggleComplete);

        // DELETE /api/todos/:id - Eliminar un todo
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}
