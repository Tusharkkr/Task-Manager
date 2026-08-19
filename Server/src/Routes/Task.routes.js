const express = require("express")
const { isLoggedIn } = require("../middlewares/LoggedInMiddleware")
const { Task } = require("../Models/Task.schema")
const { User } = require("../Models/User.schema")
const router = express.Router()

// crud

router.post("/create", isLoggedIn, async(req, res) => {
    try {
        const{ title, desc, priority, status } = req.body

        if(!title.trim() || !desc.trim() || !priority.trim() || !status.trim())
        {
            throw new Error("Please enter all the required fields")
        }

        const newTask = await Task.create({
            title,
            desc,
            priority,
            status,
            author : req.user._id
        })

        res.status(201).json({
            msg : "Task created Successfully",
            data : newTask
        })


    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
})


// /api/tasks : GET
router.get("/", isLoggedIn, async(req, res) => {
    try {

        const alltask = await Task.find({
            author : req.user._id
        })

        res.status(200).json({
            data : alltask
        })

    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
}) 

// /api/tasks/id : GET
router.get("/:id", isLoggedIn, async(req, res) => {
    try {
        const{ id } = req.params

        const foundTask = await Task.findOne({
            _id : id,
            author : req.user._id
        })


        if(!foundTask)
        {
            throw new Error("Task does not exists")
        }

        res.status(200).json({
            data : foundTask
        })
    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
})



router.delete("/:id", isLoggedIn, async(req, res) => { 
    try {
        
        const{ id } = req.params

        const delTask = await Task.deleteOne({
            _id : id,
            author : req.user._id
        })

        // console.log(delTask)

        if(delTask.deletedCount == 0)
        {
            throw new Error("Task not found")
        }


        res.status(200).json({
            msg : "Task deleted successfully"
        })

    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
})


router.patch("/change-status/:id", isLoggedIn, async(req, res) => {
    try {
        const{ status } = req.body
        const{ id } = req.params

        if(!status)
        {
            throw new Error("Please enter a valid status")
        }
        const updatedTask = await Task.findByIdAndUpdate(id, {status}, {returnDocument : "after", runValidators : true})
        

        res.status(200).json({
            msg : "Done"
        })
    } catch (error) {
        res.status(400).json({
            error : error.message
        })
    }
})


router.patch("/:id", isLoggedIn, async(req, res) => {
    try {
        
        const{ id } = req.params
        const{ title, desc, priority, status } = req.body

        if(!title.trim() || !desc.trim() || !priority.trim() || !status.trim())
        {
            throw new Error("Please enter all the fields")
        }

        const updatedTask = await Task.findOneAndUpdate({
            _id : id,
            author : req.user._id
        }, {
            title,
            desc,
            priority,
            status
        }, { returnDocument : "after", runValidators : true })

        res.status(200).json({
            msg : "Task updated successfully",
            data : updatedTask
        })



    } catch (error) {
        res.status(400).json({
            err : error.message
        })
    }
})





module.exports = {
    TaskRouter : router
}