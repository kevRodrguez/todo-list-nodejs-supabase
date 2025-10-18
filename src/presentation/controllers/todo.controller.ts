import { Request, Response, NextFunction } from 'express';
import { TodoService } from '../../services/todo.service';

export class TodoController {

  constructor(
    private readonly todoService: TodoService
  ) {}

  /**
   * Obtener todos los todos
   */
  getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await this.todoService.getAllTodos();
      
      res.json({
        ok: true,
        data: todos
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener un todo por ID
   */
  getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todoId = parseInt(id, 10);

      if (isNaN(todoId)) {
        return res.status(400).json({
          ok: false,
          message: 'ID inválido'
        });
      }

      const todo = await this.todoService.getTodoById(todoId);

      if (!todo) {
        return res.status(404).json({
          ok: false,
          message: 'Todo no encontrado'
        });
      }

      res.json({
        ok: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crear un nuevo todo
   */
  createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;

      // Validación
      if (!title || title.trim() === '') {
        return res.status(400).json({
          ok: false,
          message: 'El título es requerido'
        });
      }

      const newTodo = await this.todoService.createTodo({
        title: title.trim(),
        description: description?.trim()
      });

      res.status(201).json({
        ok: true,
        data: newTodo,
        message: 'Todo creado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualizar un todo
   */
  updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todoId = parseInt(id, 10);

      if (isNaN(todoId)) {
        return res.status(400).json({
          ok: false,
          message: 'ID inválido'
        });
      }

      const { title, description, completed } = req.body;

      // Validar que al menos un campo esté presente
      if (title === undefined && description === undefined && completed === undefined) {
        return res.status(400).json({
          ok: false,
          message: 'Debe proporcionar al menos un campo para actualizar'
        });
      }

      const updatedTodo = await this.todoService.updateTodo(todoId, {
        title: title?.trim(),
        description: description?.trim(),
        completed
      });

      if (!updatedTodo) {
        return res.status(404).json({
          ok: false,
          message: 'Todo no encontrado'
        });
      }

      res.json({
        ok: true,
        data: updatedTodo,
        message: 'Todo actualizado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Eliminar un todo
   */
  deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todoId = parseInt(id, 10);

      if (isNaN(todoId)) {
        return res.status(400).json({
          ok: false,
          message: 'ID inválido'
        });
      }

      const deleted = await this.todoService.deleteTodo(todoId);

      if (!deleted) {
        return res.status(404).json({
          ok: false,
          message: 'Todo no encontrado'
        });
      }

      res.json({
        ok: true,
        message: 'Todo eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Alternar el estado completado de un todo
   */
  toggleComplete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todoId = parseInt(id, 10);

      if (isNaN(todoId)) {
        return res.status(400).json({
          ok: false,
          message: 'ID inválido'
        });
      }

      const todo = await this.todoService.toggleTodoComplete(todoId);

      if (!todo) {
        return res.status(404).json({
          ok: false,
          message: 'Todo no encontrado'
        });
      }

      res.json({
        ok: true,
        data: todo,
        message: 'Estado actualizado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}
