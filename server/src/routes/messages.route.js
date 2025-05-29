const express = require("express");
const messagesController = require("../controllers/messages.controller");
const { catchAsync } = require("../middlewares/errors");
const { isLogged } = require("../middlewares/auth");

const api = express.Router();

// GET /messages/:id
api.get('/:id', isLogged, catchAsync(messagesController.findConversation));

// POST send message
api.post('/', isLogged, catchAsync(messagesController.sendMessage));

module.exports = api;