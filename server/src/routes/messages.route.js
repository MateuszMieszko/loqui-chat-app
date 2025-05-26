import { Router } from "express";
import messagesController from "../controllers/messages.controller.js"; 
import { catchAsync } from "../middlewares/errors.js";
import { isLogged } from "../middlewares/auth.js";

const api = Router();

// GET /messages/:id
api.get('/:id', isLogged, catchAsync(messagesController.findConversation));

// POST send message
api.post('/', isLogged, catchAsync(messagesController.sendMessage));

export default api;