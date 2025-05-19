import { Router } from "express";
import { catchAsync } from "../middlewares/errors.js";
import authController from "../controllers/auth.controller.js";

const api = Router();

// POST /auth
api.post('/', catchAsync(authController.login));

export default api;