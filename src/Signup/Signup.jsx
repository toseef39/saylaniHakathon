import React, { useState } from "react";
import img from "../assets/Frame 5.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import logo from "../assets/logo.png";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Signup = () => {
  const [showpassword, setShowpasword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkbox: false,
  });

  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.checkbox) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem(
        "users",
        JSON.stringify({
          email: user.email,
          uid: user.uid,
          firstName: input.firstName,
          lastName: input.lastName,
        })
      );

      toast.success("Signup successful!");
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowpasword(!showpassword);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden h-screen md:flex bg-[#023047] flex-1 w-[686px] flex-col justify-between items-center text-white px-4 py-8">
        <div className="w-full flex ms-28">
          <h1 className="italic text-[33.45px] leading-[100%] tracking-normal font-bold">
            <img src={logo} alt="" />
          </h1>
        </div>

        <div className="w-full flex flex-col items-start mb-12 px-11">
          <h1 className="font-bold text-[40px] leading-[100%] tracking-normal font-inter mb-4">
            Create Account
          </h1>
          <p className="text-[24px] font-normal leading-[100%] font-inter">
            Create Account and Move Forward
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white w-full flex h-screen px-4 items-center">
        <div className="max-w-[500px] mx-auto space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#023047]">Create account</h1>
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="firstName"
                value={input.firstName}
                onChange={handlechange}
                placeholder="First Name"
                className="w-full sm:w-1/2 h-11 border rounded-md px-4 border-[#023047] outline-0"
                required
              />
              <input
                type="text"
                name="lastName"
                value={input.lastName}
                onChange={handlechange}
                placeholder="Last Name"
                className="w-full sm:w-1/2 h-11 border rounded-md px-4 border-[#023047] outline-0"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handlechange}
              placeholder="Email"
              className="w-full h-11 border rounded-md px-4 border-[#023047] outline-0"
              required
            />

            <input
              type={showpassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={handlechange}
              placeholder="Password"
              className="w-full h-11 border rounded-md px-4 border-[#023047] outline-0"
              required
            />
            <div className="float-right relative bottom-11 me-3 cursor-pointer">
              {showpassword ? (
                <IoEyeOutline onClick={handleShowPassword} />
              ) : (
                <IoEyeOffOutline color="#023047" onClick={handleShowPassword} />
              )}
            </div>

            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                name="checkbox"
                checked={input.checkbox}
                onChange={handlechange}
              />
              I agree to FlatMate{" "}
              <span className="text-teal-400">Terms of Services & Privacy Policy</span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#8ECAE6] py-2 font-semibold text-xl text-white rounded-md hover:bg-emerald-500"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <button className="w-full text-[#023047] py-2 border rounded-md border-[#023047] text-xl hover:bg-emerald-500 flex items-center justify-center gap-2">
            <FcGoogle size={23} />
            Continue with Google
          </button>

          <button className="w-full text-[#023047] py-2 border rounded-md border-[#023047] text-xl hover:bg-emerald-500 flex items-center justify-center gap-2 mt-4">
            <FaApple size={23} />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};
