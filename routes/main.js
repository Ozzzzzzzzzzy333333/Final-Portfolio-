// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

// Handle routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
})
router.get('/about',function(req, res, next){
    res.render('about.ejs')
})
router.get('/Projects', function (req, res, next) {
    let sqlquery = "SELECT info FROM project"; 

    // Query the database
    db.query(sqlquery, (err, dbResult) => {
        if (err) {
            return next(err);
        }

        // setting usernameand url of  api
        const githubUsername = 'Ozzzzzzzzzzy333333';
        const url = `https://api.github.com/users/${githubUsername}/pinned`;

        request(
            {
                url: url,
                headers: { 
                    'User-Agent': 'myApp', 
                    'Accept': 'application/vnd.github.v3+json' 
                },
            },
            function (err, response, body) {
                if (err) {
                    return next(err);
                }

                try {
                    const githubProjects = JSON.parse(body); 
                    const repositories = Array.isArray(githubProjects) ? githubProjects : [];
                    res.render("projects.ejs", {
                        availableProjects: dbResult, 
                        githubProjects: repositories 
                    });
                } catch (parseError) {
                    return next(parseError);
                }
            }
        );
    });
});
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

// export the router object
module.exports = router