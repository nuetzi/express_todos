// Dependencies
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connection;
const app = express();

// Environment Variables
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log("Connected to MongoDB")
);

// Error / Disconnection
db.on("error", err => console.log(err.message));
db.on("disconnected", () => console.log("Mongo disconnected"));


// Middleware
app.use(express.urlencoded({ extended: false }));   // extended: false - does not allow nested objects in query strings
app.use(express.json());                            //use .json(), not .urlencoded()
app.use(express.static("public"));                  // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors());


// Routes
const todosController = require("./controllers/todos.js");
app.use("/todos", todosController);


app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});