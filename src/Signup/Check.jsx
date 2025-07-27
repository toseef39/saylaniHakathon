import React from "react";
import img from "../assets/Frame 5.png";
import { useNavigate } from "react-router-dom";

export const Check = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex min-h-screen">
         <div className="hidden h-screen md:flex bg-[#023047] flex-1 w-[686px] flex-col justify-between items-center text-white px-4 py-8">
        <div className="w-full flex ms-28">
          <h1 className="italic text-[33.45px] leading-[100%] tracking-normal font-bold">
            Flate<span className="md:text-sky-500">Mate</span>
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

        <div className="bg-white w-full px-16 py-32">
          <div className="max-w-[500px] mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-[#023047]">
              Check Your Email
            </h1>
            <p className="text-sm">
              We have sent an email with Password reset information to
              no****@gmail.com{" "}
            </p>

            <p className="font-normal h-4 mt-14 leading-[100%]">
              Didn’t receive the email? Check spam or promotion folder or
            </p>

            <button
              // onClick={()=>navigate("reset")}
              className="w-full  bg-[#8ECAE6] py-3 font-semibold text-xl leading-[100%] px-5 gap-3 text-white rounded-md hover:bg-emerald-500"
            >
              Resend Email
            </button>

            <button
              onClick={() => navigate("/welcome")}
              className="w-full py-3 font-semibold text-xl leading-[100%] px-5 gap-3 border border-black border-1 text-black rounded-md hover:bg-emerald-500"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
