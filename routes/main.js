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

router.get('/Projects', function(req, res, next) {
    let sqlquery = "SELECT info FROM project" // query database to get all the projects
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
                        next(err); 
        }
        res.render("projects.ejs", {availableProjects:result})
     })
})

router.get('/login',function(req, res, next){
    res.render('login.ejs')
})    
router.get('/messages',function(req, res, next){
    res.render('messages.ejs')
})

router.get('/logout', redirectLogin, (req,res) => {
    req.session.destroy(err => {
    if (err) {
      return res.redirect('./')
    }
    res.send('you are now logged out. <a href='+'./'+'>Home</a>');
    })
})




// Export the router object so index.js can access it
module.exports = router