import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Edittask = () => {
    const [obj] = useSearchParams()
    const[data, setData] = useState({
        title : obj.get("title"),
        desc : obj.get("desc"),
        priority : obj.get("priority"),
        status : obj.get("status"),
    })
    const nav = useNavigate()
    
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-6 py-10">

        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Task
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update the details of your task
            </p>
          </div>

          <div className="space-y-5">

            {/* Title */}
            <div>
              <label
                htmlFor="tt"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title
              </label>

              <input
                onChange={e => setData({
                    ...data,
                    title : e.target.value
                })}
                value={data.title}
                type="text"
                id="tt"
                className="
                  w-full px-4 py-3
                  bg-gray-50
                  border border-gray-300
                  rounded-xl
                  text-gray-800
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
                placeholder="Enter task title"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="de"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>

              <textarea
                value={data.desc}
                onChange={e => setData({
                    ...data,
                    desc : e.target.value
                })}
                id="de"
                rows="3"
                className="
                  w-full px-4 py-3
                  bg-gray-50
                  border border-gray-300
                  rounded-xl
                  text-gray-800
                  placeholder-gray-400
                  outline-none
                  resize-none
                  transition
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
                placeholder="Enter task description"
              />
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="p"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Priority
              </label>

              <select
                value={data.priority}
                onChange={e => setData({
                    ...data,
                    priority : e.target.value
                })}
                id="p"
                defaultValue=""
                className="
                  w-full px-4 py-3
                  bg-gray-50
                  border border-gray-300
                  rounded-xl
                  text-gray-700
                  outline-none
                  transition
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
              >
                <option value="" disabled>
                  Select priority
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="s"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Status
              </label>

              <select
                value={data.status}
                onChange={e => setData({
                    ...data,
                    status : e.target.value
                })}
                id="s"
                defaultValue=""
                className="
                  w-full px-4 py-3
                  bg-gray-50
                  border border-gray-300
                  rounded-xl
                  text-gray-700
                  outline-none
                  transition
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="pending">Pending</option>
                <option value="working">Working</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-3">

              <button
                onClick={() => {
                    nav("/home")
                }}
                type="button"
                className="
                  flex-1
                  py-3
                  rounded-xl
                  border border-gray-300
                  bg-white
                  text-gray-700
                  font-semibold
                  hover:bg-gray-50
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                    if(!data.desc || !data.priority || !data.status || !data.title)
                    {
                        toast.error("Please enter all the fields")
                        return
                    }

                    axios.patch(import.meta.env.VITE_BACKEND_URL + `/tasks/${obj.get("id")}`, data, {withCredentials : true})
                    .then(() => {
                        nav("/home")
                    })
                }}
                type="button"
                className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-blue-600
                  text-white
                  font-semibold
                  shadow-sm
                  hover:bg-blue-700
                  hover:shadow-md
                  active:scale-[0.98]
                  transition-all
                "
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Edittask