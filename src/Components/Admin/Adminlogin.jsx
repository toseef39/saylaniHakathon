import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import logo from "../../assets/logo.png";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, appleProvider } from "../../firebase"; // make sure appleProvider is exported
import toast from "react-hot-toast";

export const Adminlogin = () => {
  const [showpassword, setShowpasword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowpasword(!showpassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      toast.success("Login successful!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await signInWithPopup(auth, appleProvider);
      toast.success("Logged in with Apple!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden h-screen md:flex bg-[#023047] flex-1 flex-col justify-between items-center text-white px-4 py-8">
        <div className="w-full flex ms-28">
          <h1 className="italic text-[33.45px] font-bold">
            <img src={logo} alt="" />
          </h1>
        </div>
        <div className="w-full flex flex-col items-start mb-12 px-11">
          <h1 className="font-bold text-[40px] mb-4">Create Account</h1>
          <p className="text-[24px]">Create Account and Move Forward</p>
        </div>
      </div>

      <div className="flex-1 bg-white w-full flex h-screen px-4 items-center">
        <div className="max-w-[500px] mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#023047]">Admin Login</h1>
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/admin-signup")}
            >
              Signup
            </span>
          </p>

          {/* <form onSubmit={handleSubmit}> */}
           <form onSubmit={handleSubmit}>
  <input
    type="email"
    name="email"
    value={input.email}
    onChange={handleChange}
    placeholder="Email"
    required
    className="w-full h-11 border border-[#023047] outline-0 rounded-md px-4"
  />

  <input
    type={showpassword ? "text" : "password"}
    name="password"
    value={input.password}
    onChange={handleChange}
    placeholder="Password"
    required
    className="w-full h-11 border mt-4 rounded-md px-4 border-[#023047] outline-0"
  />

  <div className="float-right relative bottom-8 me-3 cursor-pointer">
    {showpassword ? (
      <IoEyeOutline onClick={handleShowPassword} />
    ) : (
      <IoEyeOffOutline color="#023047" onClick={handleShowPassword} />
    )}
  </div>

  <p
    onClick={() => navigate("/forgotpass")}
    className="text-teal-400 cursor-pointer float-end mt-2"
  >
    Forgot Password
  </p>

  <button
    type="submit"
    className="w-full bg-[#8ECAE6] py-3 font-semibold text-xl text-white rounded-md mt-6 hover:bg-emerald-500"
  >
    Login
  </button>
</form>


            {/* <button onClick={handleGoogleLogin} className="w-full text-[#023047] py-2 border rounded-md border-[#023047] text-xl hover:bg-emerald-500 flex items-center justify-center gap-2">
              <FcGoogle size={23} />
              Continue with Google
            </button>
            <button onClick={handleAppleLogin} className="w-full text-[#023047] py-2 border rounded-md border-[#023047] text-xl hover:bg-emerald-500 flex items-center justify-center gap-2 mt-4">
              <FaApple size={23} />
              Continue with Apple
            </button> */}
        </div>
      </div>
    </div>
  );
};
