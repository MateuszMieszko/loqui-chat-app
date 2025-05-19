import { Router } from "express";
import usersController from "../controllers/users.controller.js"; 
import { catchAsync } from "../middlewares/errors.js";

const api = Router();

// GET /users
api.get('/', catchAsync(usersController.findAll));

// GET /users/:id
api.get('/:id', catchAsync(usersController.findOne));

// POST /users
api.post('/', catchAsync(usersController.create));

export default api;
