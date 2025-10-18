import { Router } from 'express';
import { TodoRoutes } from './routes/todo.routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/todos', TodoRoutes.routes);



    return router;
  }


}

