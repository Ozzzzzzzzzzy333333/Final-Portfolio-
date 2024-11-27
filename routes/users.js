// Create a new router
const express = require("express")
const bcrypt = require ("bcrypt");
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/register', function (req, res, next) {
    res.render('register.ejs')                                                               
})    
router.post('/registered', [check('email').isEmail(), check('hashedPass').isLength({min: 4}), check('userName').isLength({min: 2})], function(req, res, next) {
    const errors = validationResult(req);
        if (!errors.isEmpty() ) {
            res.redirect('./register'); }
        else { 

    const saltRounds = 10
    const plainPassword = req.body.hashedPass

    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        // Store hashed password in your database.
        let sqlquery = "INSERT INTO users (userName, email, hashedPass) VALUES (?,?,?)";
        // execute sql query
        let newrecord = [req.body.userName,req.body.email, hashedPassword];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                next(err)
            }
            else
            console.log(result)
            res.send(' Hello ' + req.sanitize(req.body.userName) + ' you are now registered!  We will send an email to you at ' + req.body.email)
        })
    })
}})



router.get('/Login', function(req, res, next) {

    res.render('login.ejs')
})

router.post('/LoggedIn', function(req, res, next) {
    req.session.userId = req.body.userName;
    let sqlquery = "SELECT hashedPass FROM users WHERE userName = ?" // query database to get all the ussrs
    db.query(sqlquery, req.body.userName ,(err, result) => {
        if (err) {
            err(next);
        }

        try {
            console.log(result[0])
        hashedPassword = result[0].hashedPassword;
        } catch (error) {
            console.log(error)
        }

        bcrypt.compare(req.body.hashedpass, hashedPassword, function(err, result) {
            if (err) {
              // TODO: Handle error
              res.render('LoggedIn.ejs', {result: "error"})
            }
            else if (result == true) {
              // TODO: Send message
              res.render('LoggedIn.ejs', {result: "you have logged in "})
            }
            else {
              // TODO: Send message
              res.render('LoggedIn.ejs', {result: "no "})
            }
          })
      
     })
}) 
// Export the router object so index.js can access it
module.exports = router


