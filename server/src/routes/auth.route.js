const express = require("express");
const { catchAsync } = require("../middlewares/errors");
const authController = require("../controllers/auth.controller");
const { isLogged } = require("../middlewares/auth");

const api = express.Router();

// POST /auth
api.post('/', catchAsync(authController.login));

// DELETE /auth
api.delete('/', isLogged, catchAsync(authController.logout));

// GET /auth
api.get('/', isLogged, catchAsync(authController.checkIfLoggedIn));

module.exports = api;
