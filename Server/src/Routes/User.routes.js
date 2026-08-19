const express = require("express")
const router = express.Router()
const{ User } = require("../Models/User.schema")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { isLoggedIn } = require("../middlewares/LoggedInMiddleware")


// router.get("/test", (req, res) => {
//     res.send("Hello from test API")
// })


router.post("/signup", async(req, res) => { // userdata => username, pw, em, DOB, gender
    try {

        const {firstName, lastName, username, password, email, DOB, gender} = req.body // password should be strong -> password should be hashed 

        const validDOB = String(DOB || "").trim()

        if (!/^\d{4}-\d{2}-\d{2}$/.test(validDOB)) {
            throw new Error("Please enter a valid date")
        }

        const parsedDOB = new Date(`${validDOB}T00:00:00`)

        if (Number.isNaN(parsedDOB.getTime())) {
            throw new Error("Please enter a valid date")
        }

        const isPwStrong = validator.isStrongPassword(password)
        if(!isPwStrong)
        {
            throw new Error("Please enter a strong password")
        }

        const isEmail = validator.isEmail(email)
        if(!isEmail)
        {
            throw new Error("Please enter a valid email")
        }

        const hashedPw = await bcrypt.hash(password, 10)
        const newUser = await User.create({firstName, lastName, username, password : hashedPw, email, DOB, gender})


        res.status(201).json({
            msg : "User created Successfully!"
        })
    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
})


router.post("/login", async(req, res) => { // data => username / email + pw
    try {
        const{ username, email, password } = req.body // Qwerty123!

        const loginIdentifier = (email || username || "").trim()

        if(!loginIdentifier || !password)
        {
            throw new Error("Please enter email or username and password")
        }

        const foundUser = await User.findOne(
            loginIdentifier.includes("@")
                ? { email: loginIdentifier }
                : { username: loginIdentifier }
        )
       
        if(!foundUser)
        {
            throw new Error("User not found")
        }

        // ----------- Check Password -------------

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)

        if(!isPasswordCorrect)
        {
            throw new Error("Invalid Credentials")
        }


        // ------------ Give A Token ----------
        const token = jwt.sign({ _id : foundUser._id}, process.env.JWT_SECRET, {expiresIn : "2d"}) // generate a token


        // res.status(200)
        // res.cookie("token", token)
        // res.json({

        // })

        res.status(200).cookie("token", token, {
            secure : process.env.NODE_ENV === "production",
            httpOnly : true,
            sameSite : "none",
            maxAge : 48 * 60 * 60 * 1000,
            path : "/"
        }).json({
            msg : "User logged in"
        })



        // User.findOne({email})
        // User.findOne({username})


    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
})



router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/"
    }).json({
        msg : "User logged Out"
    })
})


// ------ protected routes -------



router.patch("/edit", isLoggedIn, async(req, res) => {
    try {

        // console.log(req.user)
        const loggedInUser = req.user
        const{ username, profilePicture, org } = req.body


        loggedInUser.username = username
        loggedInUser.profilePicture = profilePicture
        loggedInUser.org = org


        await loggedInUser.save()



        res.status(200).json({
            msg : "User updated successfully",
            data : loggedInUser
        })
    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
})


router.patch("/change-password", isLoggedIn, async (req, res) => {
    try {
        const{oldPassword, newPassword} = req.body
        const loggedInUser = req.user
        
        const isPasswordCorrect = await bcrypt.compare(oldPassword, loggedInUser.password)

        if(!isPasswordCorrect)
        {
            throw new Error("Old password does not match, please try again")
        }

        const isPwStrong = validator.isStrongPassword(newPassword)

        if(!isPwStrong)
        {
            throw new Error("Please enter a strong password")
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10)

        loggedInUser.password = newHashedPassword
        await loggedInUser.save()


        res.status(200).json({
            msg : "Password changed successfully"
        })


    } catch (error) {  
        res.status(400).json({
            err : error.message
        })
    }
})


router.get("/get-user-data", isLoggedIn ,async(req, res) => {
    try {
        
        const {firstName, lastName, username, profilePicture} = req.user

        res.status(200).json({
            data : {firstName, lastName, username, profilePicture}
        })
        
    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
})



router.patch("/change-pp", isLoggedIn, async(req, res) => {
    try {

        const{ profilePicture } = req.body
        // console.log(profilePicture)
        req.user.profilePicture = profilePicture

        await req.user.save()

        res.status(200).json({
            msg : "Done"
        })
    } catch (error) {
        res.status(400).json({
            error : error.message
        })
    }
})



// http://localhost:8080/api/users/login
// http://localhost:8080/api/users/logout
// http://localhost:8080/api/users/signup
// http://localhost:8080/api/users/edit
// http://localhost:8080/api/users/change-password

module.exports = {
    UserRouter : router
}