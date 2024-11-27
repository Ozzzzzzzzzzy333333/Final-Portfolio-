const express = require('express');
const path = require('path');
// import express
var session = require ('express-session')
// Create the express application object
// Set up session before routes

const app = express();
const port = 8000;

// Create a session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))
global.redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}
// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');
var mysql = require('mysql2')
//Import mysql module
var mysql = require('mysql2')

var validator = require ('express-validator');

const expressSanitizer = require('express-sanitizer');

// Create an input sanitizer
app.use(expressSanitizer());


// Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'portfolio_app',
    password: 'qwertyuiop',
    database: 'portfolio'
})
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})
global.db = db

// Set up middleware for parsing and sanitizing
app.use(express.urlencoded({ extended: true }));
app.use(require('express-sanitizer')());

// Serve static files from the "public" folder for CSS/JS
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "pics" folder for images
app.use('/pics', express.static(path.join(__dirname, 'pics')));

// Load the route handlers
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

// Render the index page at the root route
app.get('/', (req, res) => {
    res.render('index'); // Assuming "index.ejs" exists in the "views" folder
});
// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/', usersRoutes)

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`));