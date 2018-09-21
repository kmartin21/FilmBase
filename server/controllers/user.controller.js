const User = require('../models/user.model')

exports.userCreate = (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.nickname
    })

    user.save((err) => {
        if (err) {
            console.log("ERROR SAVING USER: ", err)
        }
        console.log('USER CREATED')
        res.send('User created successfully')
    })

    // User.findOne({username: `${req.body.nickname}`}, function(err, result, next) {
    //     if (err) { 
    //         console.log("ERROR: ", err) 
    //         next(err)
    //     }

    //     if (result) {
            
    //     } else {
    //         console.log("NO RESULT")
    //         user.save((err) => {
    //             if (err) {
    //                 console.log("ERROR SAVING USER: ", err)
    //             }
    //             console.log('USER CREATED')
    //             res.send('User created successfully')
    //         })
    //     }
    // })
}