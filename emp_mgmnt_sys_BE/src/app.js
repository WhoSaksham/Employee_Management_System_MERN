const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser"); // cookie-parser
require('dotenv').config(); // .env
require('./db')(); // DB

app.use(cookieParser()); // For parsing cookies

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    // allowedHeaders: '*'
})); // CORS

app.use(express.json()); // To deal data in JSON (parse requests of content-type : application/json)

app.use(express.urlencoded({
    extended: true
})); // parse requests of content-type : application/x-www-form-urlencoded

// Test
app.get("/", (req, res) => res.status(200).send("<h1>Welcome to Employee Management System</h1>"));

// API ROUTES =>

// User routes
app.use('/auth', require("./routes/auth.routes")); // Auth

// Employee routes
app.use('/employees', require("./routes/employee.routes")); // Employees

// Error route
app.all("*", (req, res) => res.status(404).send("Not Found"));

// Server Listening
app.listen(process.env.PORT || 8000, () => console.log(`Server has started successfully`));