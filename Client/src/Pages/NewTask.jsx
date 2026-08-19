import React, { useRef, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"
import Navbar from '../Components/Navbar'

const NewTask = () => {

    const titleRef = useRef(null)
    const descRef = useRef(null)
    const statusRef = useRef(null)
    const priorityRef = useRef(null)
    
  return (
    <div>
    
    <Navbar />

    <div className="min-h-[calc(100vh-4rem)] bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Task
        </h2>

        <div className="space-y-5">

          <div>
            <label
              htmlFor="tt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              id="tt"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="de"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <input
              ref={descRef}
              type="text"
              id="de"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label
              htmlFor="p"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Priority
            </label>
            <select
              ref={priorityRef}
              id="p"
              defaultValue=""
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="s"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status
            </label>
            <select
              ref={statusRef}
              id="s"
              defaultValue=""
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select status</option>
              <option value="pending">Pending</option>
              <option value="working">Working</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            onClick={() => {
               if(!titleRef.current.value || !descRef.current.value || !priorityRef.current.value || !statusRef.current.value)
               {
                toast.error("Please enter all the fields")
                return
               }

               axios.post(import.meta.env.VITE_BACKEND_URL + "/tasks/create", {
                title : titleRef.current.value,
                desc : descRef.current.value,
                status : statusRef.current.value,
                priority : priorityRef.current.value
               }, {withCredentials : true})
               .then((res) => {

                    titleRef.current.value = ""
                    descRef.current.value = ""
                    priorityRef.current.value = ""
                    statusRef.current.value = ""

                    toast.success("Task created successfully...")

               })
            }}
            type="button"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Task
          </button>

        </div>
      </div>
    </div>

    </div>

  )
}

export default NewTask