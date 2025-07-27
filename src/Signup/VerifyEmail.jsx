import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png"

export const VerifyEmail = () => {
  const[loading, setLoading]=useState(false)
  const navigate = useNavigate();
  const [input, setInput] = useState({
    text1: "",
    text2: "",
    text3: "",
    text4: "",
    text5: "",
    text6: "",
  });

  // Input refs for auto-focusing
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (/^[0-9]?$/.test(value)) {
      setInput((prev) => ({ ...prev, [name]: value }));

      // Move focus to next input if value is valid
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    const otp =
      input.text1 +
      input.text2 +
      input.text3 +
      input.text4 +
      input.text5 +
      input.text6;

    const email = localStorage.getItem("email");

    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP");
      return;
    }
   setLoading(true)
    axios
      .put("http://localhost:3000/users/verifyforgetpasswordotp", {
        email: email,
        otp: otp,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("OTP Verified");

          setTimeout(() => {
            setLoading(false)
            navigate("/reset");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        toast.error(error.response?.data?.message || "Invalid or expired OTP");
      });
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

      <div className="flex-1 bg-white w-full flex px-4 items-center">
        <div className="max-w-[500px] mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#023047]">Verify Your Email</h1>
          <p className="text-sm">
            We have sent a verification email to no****@gmail.com{" "}
          </p>

          <div className="flex space-x-1">
            {["text1", "text2", "text3", "text4", "text5", "text6"].map(
              (name, index) => (
                <input
                  key={index}
                  type="text"
                  name={name}
                  value={input[name]}
                  onChange={(e) => handleChange(e, index)}
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-10 h-10 md:w-20 md:h-20 border rounded-md px-2 text-center border-[#023047]"
                />
              )
            )}
          </div>

          <p>Didn’t receive the email? Check spam or promotion folder or</p>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#219EBC] py-3 font-medium text-white rounded-md hover:bg-blue-600"
          >
            Submit Otp
          </button>
           <button
            onClick={()=>navigate("/forgotpass")}
            className="w-full bg-[#219EBC] py-3 font-medium text-white rounded-md hover:bg-blue-600"
          >
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
};
