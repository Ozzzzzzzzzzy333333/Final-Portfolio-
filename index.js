// Import express and ejs
var express = require ('express')

// import express
var session = require ('express-session')

var ejs = require('ejs')

//Import mysql module
var mysql = require('mysql2')

var validator = require ('express-validator');

const expressSanitizer = require('express-sanitizer');



// Create the express application object
const app = express()
const port = 8000

// Create an input sanitizer
app.use(expressSanitizer());


// Create a session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))


// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Set up public folder (for css and statis js)
app.use(express.static(__dirname + '/public'))

// Define the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'bettys_books_app',
    password: 'qwertyuiop',
    database: 'bettys_books'
})
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})
global.db = db

// Define our application-specific data
app.locals.portData = {portName: "OZ's Portfolio"}

// Load the route handlers
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

app.get('/', (req, res) => {
    res.render('index'); // Assuming EJS or Pug is configured
});

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`))