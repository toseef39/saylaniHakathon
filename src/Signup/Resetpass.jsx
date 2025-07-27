import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import logo from "../assets/logo.png"

export const Resetpass = () => {
  const navigate = useNavigate();

  const [passwordUpdate, setPasswordUpdate] = useState({
    pass: "",
    confirmPass: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    const { pass, confirmPass } = passwordUpdate;
    const email = localStorage.getItem("email");

    if (!pass || !confirmPass) {
      toast.error("All fields are required");
      return;
    }

    if (pass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:3000/users/setnewpassword",
        {
          email,
          password: pass,
          confirmPassword: confirmPass,
        }
      );

      toast.success("Password updated successfully");
      navigate("/welcome");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
 
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

      <div className="flex flex-1 bg-white w-full items-center px-4">
        <div className="max-w-[500px] mx-auto space-y-4">
          <h1 className="text-3xl font-bold text-[#023047]">Reset Password</h1>
          <p className="text-sm font-normal">
            Choose a new password for your account
          </p>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="pass"
              value={passwordUpdate.pass}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full h-11 border rounded-md px-4 border-[#023047] outline-none"
            />
            <div className="absolute top-3 right-4 cursor-pointer">
              {showPassword ? (
                <IoEyeOutline onClick={togglePasswordVisibility} />
              ) : (
                <IoEyeOffOutline onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>

          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPass"
              value={passwordUpdate.confirmPass}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full h-11 border rounded-md px-4 border-[#023047] outline-none"
            />
            <div className="absolute top-3 right-4 cursor-pointer">
              {showPassword ? (
                <IoEyeOutline onClick={togglePasswordVisibility} />
              ) : (
                <IoEyeOffOutline onClick={togglePasswordVisibility} />
              )}
            </div>
          </div>

          <button
            onClick={handleUpdatePassword}
            className="w-full bg-[#8ECAE6] py-3 font-semibold text-white rounded-md hover:bg-emerald-500"
          >
            Reset Password
          </button>

          <button
            onClick={() => navigate("/welcome")}
            className="w-full py-3 font-semibold border border-black text-black rounded-md hover:bg-gray-100"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
