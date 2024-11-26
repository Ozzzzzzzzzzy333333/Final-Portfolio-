// Create a new router
const express = require("express")
const router = express.Router()


// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
})

router.get('/about',function(req, res, next){
    res.render('about.ejs')
})

router.get('/projects',function(req, res, next){
    res.render('projects.ejs')
})

router.get('/login',function(req, res, next){
    res.render('login.ejs')
})
router.get('/messages',function(req, res, next){
    res.render('messages.ejs')
})





// Export the router object so index.js can access it
module.exports = router