import { Router } from "express";
import * as TaskController from '../controller/TaskController';

const routes = Router();

routes.get('/', TaskController.getAll);


export default routes