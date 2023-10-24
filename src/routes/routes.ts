import { Router } from "express";
import * as TaskController from '../controller/TaskController';

const routes = Router();

routes.get('/', TaskController.getAll);
routes.get('/todo/:id', TaskController.getById);

routes.post('/search', TaskController.startWith);
routes.post('/create', TaskController.createTodo);

routes.put('/todo/check/:id', TaskController.checkTodo);
routes.put('/todo/update/:id', TaskController.updateTodo);

routes.delete('/todo/:id',TaskController.deleteTodo);



export default routes