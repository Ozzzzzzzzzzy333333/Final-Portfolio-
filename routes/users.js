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
        // Store hashed password the data base
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
    
    let sqlquery = "SELECT hashedPass FROM users WHERE userName = ?" // query database to get all the ussrs
    db.query(sqlquery, req.body.userName ,(err, result) => {
        if (err) {
            err(next);
        }

        try {
            console.log(result[0])
        hashedPassword = result[0].hashedPass;
        } catch (error) {
            console.log(error)
        }

        console.log(req.body.hashedPass)
        console.log(hashedPassword)

        bcrypt.compare(req.body.hashedPass, hashedPassword, function(err, result) {
            if (err) {
              // TODO: Handle error
              console.log("err")
              res.render('LoggedIn.ejs', {result: "error"})
            }
            else if (result == true) {
              // TODO: Send message
              console.log("true")
              req.session.userId = req.body.userName;
              res.render('index.ejs', {result: "you have logged in "})
            }
            else {
              // TODO: Send message
              console.log("else")
              res.render('LoggedIn.ejs', {result: "no "})
            }
          })
      
     })
}) 
// Export the router object
module.exports = router


