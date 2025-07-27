import React from "react";
import img from "../assets/Frame 5.png";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

export const SuccessfulReset = () => {
  const navigate = useNavigate();

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

      <div className="flex-1 bg-white w-full flex  h-screen px-4  items-center">
        <div className="max-w-[500px] mx-auto space-y-6 text-center">
          <div className="flex justify-center items-center h-[100px]">
            <CiCircleCheck color="green" size={"90px"} />
          </div>

          <p className="font-semibold text-2xl ">Password Successfully Reset</p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#8ECAE6] py-4 font-semibold text-xl text-white rounded-md hover:bg-emerald-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
