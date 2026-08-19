import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [data, setData] = useState([])
  const nav = useNavigate()
  const pendingRef = useRef(null)
  const workingRef = useRef(null)
  const completedRef = useRef(null)

  const priorityStyles = {
    high: "bg-red-100 text-red-700 border border-red-300 shadow-red-100",
    medium: "bg-yellow-100 text-yellow-700 border border-yellow-300 shadow-yellow-100",
    low: "bg-green-100 text-green-700 border border-green-300 shadow-green-100",
  }

  useEffect(() => {

    async function getData() {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/tasks",
        { withCredentials: true }
      )

      setData(res.data.data)
    }

    getData()

  }, [])

  const TaskCard = ({ item }) => {
    return (
      <article
        onDragStart={(e) => {
          e.dataTransfer.setData("yedraghorhahai", e.target.id)
          // console.log(e.target.id)
        }}  
        key={item._id}
        id={item._id}
        draggable={true}
        className="
          group
          bg-white
          border-2 border-gray-200
          rounded-lg
          p-4
          cursor-grab
          active:cursor-grabbing
          shadow-md
          hover:shadow-lg
          hover:border-blue-300
          hover:-translate-y-1
          transition-all duration-200
          backdrop-blur-sm
        "
      >

        {/* Top */}
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0 flex-1">

            <h2 className="text-base font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
              {item.title}
            </h2>

            <p className="text-sm text-gray-600 mt-2 line-clamp-2 group-hover:text-gray-700">
              {item.desc}
            </p>

          </div>

          {/* Edit Button */}
          <button
            onClick={() => {
              nav(`/edit?title=${item.title}&desc=${item.desc}&priority=${item.priority}&status=${item.status}&id=${item._id}`)
            }}
            className="
              shrink-0
              p-2
              rounded-lg
              text-gray-500
              hover:text-blue-600
              hover:bg-blue-50
              transition-all duration-200
              opacity-100 md:opacity-0 md:group-hover:opacity-100
            "
            title="Edit task"
          >
            ✏️
          </button>

        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between mt-4">

          <span
            className={`
              px-3 py-1
              rounded-full
              text-xs
              font-bold
              capitalize
              shadow-sm
              ${priorityStyles[item.priority]}
            `}
          >
            {item.priority}
          </span>

          <span className="text-xs text-gray-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            Drag to move
          </span>

        </div>

      </article>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-12">

        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Task Manager
          </h1>
          <p className="px-2 text-gray-600 text-base sm:text-lg">Organize and track your tasks efficiently</p>
          <div className="h-1 w-20 bg-linear-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>


        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ================= PENDING ================= */}
          <section className="
            bg-white
            rounded-2xl
            border border-gray-200
            overflow-hidden
            shadow-lg hover:shadow-xl
            transition-all duration-300
            flex flex-col
          ">

            <div className="
              px-6 py-5
              border-b-2 border-yellow-200
              bg-linear-to-r from-yellow-50 to-orange-50
            ">
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    Pending
                  </h2>
                </div>

                <span className="
                  px-3 py-1.5
                  rounded-full
                  bg-yellow-200
                  text-yellow-800
                  text-sm
                  font-bold
                  shadow-sm
                ">
                  {data.filter(item => item.status === "pending").length}
                </span>

              </div>
            </div>






            <div 
              ref={pendingRef}
               onDragOver={(e) => {
                e.preventDefault()
              }}

              onDrop={(e) => {
                const id = e.dataTransfer.getData("yedraghorhahai")
                pendingRef.current.append(document.getElementById(id))

                axios.patch(import.meta.env.VITE_BACKEND_URL + `/tasks/change-status/${id}`, {status : "pending"}, {withCredentials : true})
                .then((res) => {
                  console.log(res)
                })
              }}
              className="
              p-5
              space-y-4
              h-[52vh] min-h-64 md:h-[65vh]
              overflow-y-auto
              flex-1
              bg-linear-to-b from-white to-gray-50
              scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-transparent
            ">











              {data.map((item) => {

                if (item.status != "pending") {
                  return null
                }

                return (
                  <TaskCard
                    key={item._id}
                    item={item}
                  />
                )
              })}

            </div>

          </section>


          {/* ================= IN PROGRESS ================= */}
          <section className="
            bg-white
            rounded-2xl
            border border-gray-200
            overflow-hidden
            shadow-lg hover:shadow-xl
            transition-all duration-300
            flex flex-col
          ">

            <div className="
              px-6 py-5
              border-b-2 border-blue-200
              bg-linear-to-r from-blue-50 to-cyan-50
            ">
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚙️</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    In Progress
                  </h2>
                </div>

                <span className="
                  px-3 py-1.5
                  rounded-full
                  bg-blue-200
                  text-blue-800
                  text-sm
                  font-bold
                  shadow-sm
                ">
                  {data.filter(item => item.status === "working").length}
                </span>

              </div>
            </div>















            <div 
            ref={workingRef}
              onDragOver={(e) => {
                e.preventDefault()
              }}

              onDrop={(e) => {
                const id = e.dataTransfer.getData("yedraghorhahai")
                workingRef.current.append(document.getElementById(id))
             
                axios.patch(import.meta.env.VITE_BACKEND_URL + `/tasks/change-status/${id}`, {status : "working"}, {withCredentials : true})
                .then((res) => {
                  console.log(res)
                })
              }}
              className="
              p-5
              space-y-4
              h-[52vh] min-h-64 md:h-[65vh]
              overflow-y-auto
              flex-1
              bg-linear-to-b from-white to-gray-50
              scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent
            ">










              {data.map((item) => {

                if (item.status != "working") {
                  return null
                }

                return (
                  <TaskCard
                    key={item._id}
                    item={item}
                  />
                )
              })}

            </div>

          </section>


          {/* ================= COMPLETED ================= */}
          <section className="
            bg-white
            rounded-2xl
            border border-gray-200
            overflow-hidden
            shadow-lg hover:shadow-xl
            transition-all duration-300
            flex flex-col
          ">

            <div className="
              px-6 py-5
              border-b-2 border-green-200
              bg-linear-to-r from-green-50 to-emerald-50
            ">
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <h2 className="text-lg font-bold text-gray-800">
                    Completed
                  </h2>
                </div>

                <span className="
                  px-3 py-1.5
                  rounded-full
                  bg-green-200
                  text-green-800
                  text-sm
                  font-bold
                  shadow-sm
                ">
                  {data.filter(item => item.status === "completed").length}
                </span>

              </div>
            </div>









            <div 
              ref={completedRef}
               onDragOver={(e) => {
                e.preventDefault()
              }}

              onDrop={(e) => {
                // completedRef.current.append(document.getElementById(e.dataTransfer.getData("yedraghorhahai")))
              
               const id = e.dataTransfer.getData("yedraghorhahai")
                completedRef.current.append(document.getElementById(id))
             
                axios.patch(import.meta.env.VITE_BACKEND_URL + `/tasks/change-status/${id}`, {status : "completed"}, {withCredentials : true})
                .then((res) => {
                  console.log(res)
                })
              
              }}
              className="
              p-5
              space-y-4
              h-[52vh] min-h-64 md:h-[65vh]
              overflow-y-auto
              flex-1
              bg-linear-to-b from-white to-gray-50
              scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent
            ">









              {data.map((item) => {

                if (item.status != "completed") {
                  return null
                }

                return (
                  <TaskCard
                    key={item._id}
                    item={item}
                  />
                )
              })}

            </div>

          </section>

        </div>

      </div>

    </div>
  )
}

export default Home