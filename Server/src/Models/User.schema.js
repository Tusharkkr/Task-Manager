const mongoose = require("mongoose")




const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 15,
        trim : true,
        immutable : true
    },
    lastName : {
        type : String,
        required : true, 
        minLength : 3,
        maxLength : 15,
        trim : true,
        immutable : true
    },
    username : {
        type : String, 
        required : true,
        minLength : 4,
        maxLength : 20,
        trim : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        minLength : 11,
        unique : true,
        trim : true,
        maxLength : 30,
        immutable : true
    },
    profilePicture : {
        type : String,
        trim : true
    },
    // tasks : [],
    DOB : {
        type : String,
        required : true, 
        trim : true,
        immutable : true
    },
    gender : {
        // enum : ["male", "female", "others"],
        type : String,
        enum : {
            values : ["male", "female", "others"],
            message : '{VALUE} is not a valid gender type'
        },
        required : true,
        immutable : true
    },
    org : {
        type : String,
        maxLength : 40,
        minLength : 3,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true,
    }
    // createdAt : {
    //     time : Date.now()
    // }

}, {timestamps : true})

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
}