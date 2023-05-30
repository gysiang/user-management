const express = require("express");

class UsersRouter {
  constructor(controller) {
    this.controller = controller;
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .post("/signup", this.controller.signupUser.bind(this.controller))
      .post("/login", this.controller.loginUser.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

module.exports = UsersRouter;
