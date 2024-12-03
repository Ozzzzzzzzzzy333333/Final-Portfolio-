const express = require("express")
const router = express.Router()
const request = require('request')

router.get('/projects', function (req, res, next) {
        // Query database to get projects
        let sqlquery = "SELECT * FROM project"

        // Execute the sql query
        db.query(sqlquery, (err, result) => {
            // Return results as a JSON object
            if (err) {
                res.json(err)
                next(err)
            }
            else {
                res.json(result)
            }
        })                                                              
})   

// export the router object
module.exports = router