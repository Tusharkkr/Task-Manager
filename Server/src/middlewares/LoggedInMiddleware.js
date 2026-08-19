const jwt = require("jsonwebtoken")
const{ User } = require("../Models/User.schema")



const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies

        const obj = jwt.decode(token, process.env.JWT_SECRET) // _id
        // console.log(obj)

        if(!obj)
        {
            throw new Error("Please log in...")
        }

        const foundUser = await User.findById(obj._id)

        if(!foundUser)
        {
            throw new Error("Please log in...")
        }
        

        // -- attach the found user to the req object --

        req.user = foundUser



        next()
    } catch (error) {
        res.status(404).json({
            err : error.message
        })
    }
}

module.exports = {
    isLoggedIn
}




// 1 -> req
// 2 -> req, res
// 3 -> req, res, next
// 4 -> err, req, res, next


// token creation -> sign() => original data -> decode()