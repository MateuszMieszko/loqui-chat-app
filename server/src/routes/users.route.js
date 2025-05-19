import { Router } from "express";
import usersController from "../controllers/users.controller.js"; 
import { catchAsync } from "../middlewares/errors.js";
import { isLogged } from "../middlewares/auth.js";

const api = Router();

// GET /users
api.get('/', isLogged, catchAsync(usersController.findAll));

// GET /users/:id
api.get('/:id', isLogged, catchAsync(usersController.findOne));

// POST /users
api.post('/', catchAsync(usersController.create));

// DELETE /users
api.delete('/', isLogged, catchAsync(usersController.remove));

export default api;
