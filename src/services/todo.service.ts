import { pool } from '../db';
import { CreateTodoDto, Todo, UpdateTodoDto } from '../domain/interfaces/todo.interface';

export class TodoService {

    /**
     * Obtener todos los todos
     */
    async getAllTodos(): Promise<Todo[]> {
        const query = `
      SELECT id, title, description, completed, created_at, updated_at
      FROM todos
      ORDER BY created_at DESC
    `;

        const result = await pool.query(query);
        return result.rows;
    }

    /**
     * Obtener un todo por ID
     */
    async getTodoById(id: number): Promise<Todo | null> {
        const query = `
      SELECT id, title, description, completed, created_at, updated_at
      FROM todos
      WHERE id = $1
    `;

        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    /**
     * Crear un nuevo todo
     */
    async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const { title, description } = createTodoDto;

        const query = `
      INSERT INTO todos (title, description, completed)
      VALUES ($1, $2, false)
      RETURNING id, title, description, completed, created_at, updated_at
    `;

        const result = await pool.query(query, [title, description || null]);
        return result.rows[0];
    }

    /**
     * Actualizar un todo
     */
    async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
        const { title, description, completed } = updateTodoDto;

        // Construir dinámicamente la query basado en los campos proporcionados
        const fields: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        if (title !== undefined) {
            fields.push(`title = $${paramIndex++}`);
            values.push(title);
        }

        if (description !== undefined) {
            fields.push(`description = $${paramIndex++}`);
            values.push(description);
        }

        if (completed !== undefined) {
            fields.push(`completed = $${paramIndex++}`);
            values.push(completed);
        }

        if (fields.length === 0) {
            // Si no hay campos para actualizar, devolver el todo actual
            return this.getTodoById(id);
        }

        fields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        const query = `
      UPDATE todos
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, title, description, completed, created_at, updated_at
    `;

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    /**
     * Eliminar un todo
     */
    async deleteTodo(id: number): Promise<boolean> {
        const query = `DELETE FROM todos WHERE id = $1`;
        const result = await pool.query(query, [id]);
        return (result.rowCount ?? 0) > 0;
    }

    /**
     * Alternar el estado completado de un todo
     */
    async toggleTodoComplete(id: number): Promise<Todo | null> {
        const query = `
      UPDATE todos
      SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, title, description, completed, created_at, updated_at
    `;

        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }
}
