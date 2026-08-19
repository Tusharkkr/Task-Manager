const mongoose = require("mongoose")


const TaskSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
        trim : true,
        // immutable : true,
        maxLength : 40
    },
    desc : {
        type : String,
        required : true,
        trim : true,
        // immutable : true,
        maxLength : 100
    },
    priority : {
        type : String,
        enum : {
            values : ["low", "medium", "high"],
            message : "{VALUE} is not a valid priority type"
        },
        required : true,
        // immutable : true
    },
    status : {
        type : String,
        enum : {
            values : ["pending", "working", "completed"],
            message : "{VALUE} is not a valid status type"
        },
        default : "pending",
        required : true
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        // ref : "User",
        immutable : true
    }


}, {timestamps : true})


const Task = mongoose.model("Task", TaskSchema)

module.exports = {
    Task
}