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
        const url = `https://api.github.com/users/${githubUsername}/repos`;

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
router.get('/messages', global.redirectLogin, function (req, res, next) {
    // calling stored procedrals 
    const sqlquery = "CALL search_procedure(?)";
    const searchText = `%${req.query.search_text || ''}%`;
    const userName = req.session.userId;

    db.query(sqlquery, [searchText], (err, result) => {
        if (err) {
            return next(err); 
        }
        console.log(result);
        res.render('messages.ejs', {availableUsers: result[0], currentUser: userName});
    });
});
router.post('/messages/messageSent', function (req, res, next) {
    // saving data in database
    let sqlquery = "INSERT INTO messages (sendId, message, recieverId ) VALUES (?,?,?)"
    // execute sql query
    let newrecord = [req.body.sendId, req.body.message, req.body.recieverId]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send(' Your message has been sent')
    })
}) 
router.get('/messagesIncoming', global.redirectLogin, function (req, res, next) {
    // this one uses stored procedurals  
    const userName = req.session.userId;
    const sqlquery = "CALL message_procedure(?)";
    db.query(sqlquery, [userName], (err, result) => {
        if (err) {
            return next(err); 
        }
        console.log(result[0]);
        res.render('messagesFrom.ejs', { availableMessages: result[0], currentUser: userName}); 
    });
});
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
