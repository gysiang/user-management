const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;
const dotenv = require("dotenv");
dotenv.config();


// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests

// import db
const db = require("./models/index.js");


// import controllers
const Users = require("./controllers/users.js");

// init controllers
const usersController = new Users(db.User);

// import routers
const UsersRouter = require("./routers/usersRouter.js");


// Initializing routers
const usersRouter = new UsersRouter(usersController).getRouter();
app.use("/", usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
