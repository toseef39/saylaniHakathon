import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import {
  auth,
  googleProvider,
  appleProvider,
} from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const Adminsignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkbox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.checkbox) {
      toast.error("Please accept terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, input.email, input.password);
      toast.success("Admin account created successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google signup successful!");
      navigate("/admin");
    } catch (error) {
      toast.error("Google signup failed: " + error.message);
    }
  };

  const handleAppleSignup = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      toast.success("Apple signup successful!");
      navigate("/admin");
    } catch (error) {
      toast.error("Apple signup failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side */}
      <div className="hidden h-screen md:flex bg-[#023047] flex-1 w-[686px] flex-col justify-between items-center text-white px-4 py-8">
        <div className="w-full flex ms-28">
          <h1 className="italic text-[33.45px] font-bold">
            <img src={logo} alt="Logo" />
          </h1>
        </div>
        <div className="w-full flex flex-col items-start mb-12 px-11">
          <h1 className="font-bold text-[40px] mb-4">Create Account</h1>
          <p className="text-[24px]">Create Account and Move Forward</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 bg-white w-full flex h-screen px-4 items-center">
        <div className="max-w-[500px] mx-auto space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#023047]">
            Create Admin account
          </h1>
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/admin-login")}
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
                onChange={handleChange}
                placeholder="First Name"
                className="w-full sm:w-1/2 h-11 border rounded-md px-4 border-[#023047] outline-0"
                required
              />
              <input
                type="text"
                name="lastName"
                value={input.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full sm:w-1/2 h-11 border rounded-md px-4 border-[#023047] outline-0"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full h-11 border rounded-md px-4 border-[#023047] outline-0"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-11 border rounded-md px-4 border-[#023047] outline-0"
                required
              />
              <div className="absolute right-4 top-3 cursor-pointer">
                {showPassword ? (
                  <IoEyeOutline onClick={handleShowPassword} />
                ) : (
                  <IoEyeOffOutline onClick={handleShowPassword} />
                )}
              </div>
            </div>

            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                name="checkbox"
                checked={input.checkbox}
                onChange={handleChange}
              />
              I agree to FlatMate{" "}
              <span className="text-teal-400">
                Terms of Services & Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8ECAE6] py-2 font-semibold text-xl text-white rounded-md hover:bg-emerald-500"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* <button
            onClick={handleGoogleSignup}
            className="w-full text-[#023047] py-2 border rounded-md border-[#023047] text-xl hover:bg-emerald-500 flex items-center justify-center gap-2"
          >
            <FcGoogle size={23} />
            Continue with Google
          </button>

          <button
            onClick={handleAppleSignup}
            className="w-full text-[#023047] py-2 border rounded-md border-[#023047] text-xl hover:bg-emerald-500 flex items-center justify-center gap-2 mt-4"
          >
            <FaApple size={23} />
            Continue with Apple
          </button> */}
        </div>
      </div>
    </div>
  );
};
