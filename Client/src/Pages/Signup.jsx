import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const nav = useNavigate()

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    DOB: "",
    gender: "",
    password: "",
  });

  function inputChangeHandler(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  function btnChangeHandler() {
    if (
      userData.firstName &&
      userData.lastName &&
      userData.username &&
      userData.email &&
      userData.DOB &&
      userData.gender &&
      userData.password
    ) {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/users/signup", userData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-gray-100 to-slate-200">
      <div className="flex min-h-screen items-start justify-center px-4 py-6 sm:items-center sm:p-6">
      <div className="mx-auto my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-blue-600 px-5 py-6 sm:px-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Create Account</h1>
          <p className="text-blue-100 mt-1">
            Join us by filling in your details.
          </p>
        </div>

        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                value={userData.firstName}
                onChange={inputChangeHandler}
                name="firstName"
                type="text"
                placeholder="John"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <input
                value={userData.lastName}
                onChange={inputChangeHandler}
                name="lastName"
                type="text"
                placeholder="Doe"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                value={userData.username}
                onChange={inputChangeHandler}
                name="username"
                type="text"
                placeholder="johndoe"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                value={userData.email}
                onChange={inputChangeHandler}
                name="email"
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                value={userData.DOB}
                onChange={inputChangeHandler}
                name="DOB"
                type="date"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={userData.gender}
                onChange={inputChangeHandler}
                name="gender"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                value={userData.password}
                onChange={inputChangeHandler}
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2 pt-2">
              <button
                onClick={btnChangeHandler}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span onClick={() => nav("/login")} className="text-blue-600 font-semibold cursor-pointer hover:underline">
              Sign In
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Signup;