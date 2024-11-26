const express = require('express');
const path = require('path');

// Create the express application object
const app = express();
const port = 8000;

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

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

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`));