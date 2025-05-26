import { Router } from "express";
import { catchAsync } from "../middlewares/errors.js";
import authController from "../controllers/auth.controller.js";
import { isLogged } from "../middlewares/auth.js";

const api = Router();

// POST /auth
api.post('/', catchAsync(authController.login));

// DELETE /auth
api.delete('/', isLogged, catchAsync(authController.logout));

// GET /auth
api.get('/', isLogged, catchAsync(authController.checkIfLoggedIn));

export default api;