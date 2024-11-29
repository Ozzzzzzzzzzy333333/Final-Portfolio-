const express = require('express');
const path = require('path');
var session = require ('express-session')

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
// redirect to the login page
global.redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/login') 
    } else { 
        next (); 
    } 
}
// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');
var mysql = require('mysql2')
//Import mysql module
var mysql = require('mysql2')
var validator = require ('express-validator');

const expressSanitizer = require('express-sanitizer');
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


app.use(express.urlencoded({ extended: true }));
app.use(require('express-sanitizer')());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/pics', express.static(path.join(__dirname, 'pics')));

// Load the route handlers
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

// // Render the index page 
// app.get('/', (req, res) => {
//     res.render('index'); 
// });


app.listen(port, () => console.log(`Node app listening on port ${port}!`));