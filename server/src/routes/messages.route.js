import { Router } from "express";
import messagesController from "../controllers/messages.controller.js"; 
import { catchAsync } from "../middlewares/errors.js";

const api = Router();

// GET /messages/:id
api.get('/:id', catchAsync(messagesController.findConversation));

// POST send message
api.post('/', catchAsync(messagesController.sendMessage));

export default api;