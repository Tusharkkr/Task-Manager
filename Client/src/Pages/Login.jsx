import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const nav = useNavigate()
    const[userData, setUserData] = useState({
        username : "",
        email : "",
        password : ""
    })


    function inputChangeHandler(e) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    }

    function btnCLickHandler()
    {
        const hasLoginIdentifier = Boolean(userData.email || userData.username)

        if(hasLoginIdentifier && userData.password)
        {
            axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", userData, {withCredentials : true})
            .then((res) => {
                nav("/")
            })
            .catch((err) => {
                console.log(err.response?.data || err.message)
            })
        }
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-gray-100 to-slate-200">
      <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:p-6">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="bg-blue-600 px-5 py-6 sm:px-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Welcome Back</h1>
          <p className="text-blue-100 mt-1">
            Login to continue to your account.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5 p-4 sm:space-y-6 sm:p-8">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              onChange={(e) => inputChangeHandler(e)}
              name="email"
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              onChange={(e) => inputChangeHandler(e)}
              name="username"
              type="text"
              placeholder="johndoe"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              onChange={(e) => inputChangeHandler(e)}
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Login Button */}
          <button onClick={btnCLickHandler} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]">
            Login
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <span onClick={() => nav("/signup")} className="text-blue-600 font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;