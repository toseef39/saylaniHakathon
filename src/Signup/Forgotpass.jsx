import React, { useState } from "react";
import img from "../assets/Frame 5.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { IoEyeOffOutline } from "react-icons/io5";
import logo from "../assets/logo.png"

export const Forgotpass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] =useState(false)
  const [email, setEmail] = useState({
    email: "",
  });
  const handleChange = (e) => {
    setEmail((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleSubmit = () => {
    setLoading(true)
    axios
      .put("http://localhost:3000/users/forgetpassword", {
        email: email.email,
      })
      .then((res) => {
        console.log(res);
        // console.log("email",email)
        localStorage.setItem("email", email.email);
        setTimeout(() => {
          setLoading(false)
          navigate("/verify");
        }, 2000);
      })
      .catch((err) => {
        console.log("email", err.data.user.email);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden h-screen md:flex bg-[#023047] flex-1 w-[686px] flex-col justify-between items-center text-white px-4 py-8">
        <div className="w-full flex ms-28">
          <h1 className="italic text-[33.45px] leading-[100%] tracking-normal font-bold">
            {/* Flate<span className="md:text-sky-500">Mate</span> */}
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

      <div className="flex-1 bg-white w-full flex  h-screen px-4  items-center ">
        <div className="max-w-[500px] mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#023047]">Forgot Password</h1>
          <p className="text-sm font-normal">
            Enter the email you used to create your account so we can send you
            instructions on how to reset your password.
          </p>

          <input
            type="email"
            name="email"
            value={email.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-[#023047]  outline-0 h-11 rounded-md px-4"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-red-700 md:bg-[#8ECAE6] py-2 font-semibold text-xl text-white rounded-md hover:bg-emerald-500"
          >
            Send
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 font-semibold text-xl border border-[#023047]  text-[#023047] rounded-md hover:bg-emerald-500"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
