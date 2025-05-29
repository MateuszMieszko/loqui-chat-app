const express = require("express");
const usersController = require("../controllers/users.controller");
const { catchAsync } = require("../middlewares/errors");
const { isLogged } = require("../middlewares/auth");

const api = express.Router();

// GET /users
api.get('/', isLogged, catchAsync(usersController.findAll));

// GET /users/:id
api.get('/:id', isLogged, catchAsync(usersController.findOne));

// POST /users
api.post('/', catchAsync(usersController.create));

// DELETE /users
api.delete('/', isLogged, catchAsync(usersController.remove));

// PUT /users
api.put('/', isLogged, catchAsync(usersController.modify));

module.exports = api;
