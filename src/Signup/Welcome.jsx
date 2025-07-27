import React, { useState } from "react";
import img4 from "../assets/Frame 19 (10).png";
import img from "../assets/Frame 5.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Welcome = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("users", JSON.stringify({
        email: user.email,
        uid: user.uid,
      }));

      toast.success("Successfully logged in");

      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left section */}
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

        {/* Right section */}
        <div className="flex-1 bg-white w-full flex h-screen px-4 items-center">
          <div className="max-w-[500px] mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-[#023047]">Welcome Back</h1>
            <p className="text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Signup
              </span>
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email"
                className="w-full h-11 border border-[#023047] outline-0 rounded-md px-4"
              />

              <input
                type={showpassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Password"
                className="w-full h-11 border mt-4 rounded-md px-4 border-[#023047] outline-0"
              />
              <div className="float-right relative bottom-8 me-3 cursor-pointer">
                {showpassword ? (
                  <IoEyeOutline onClick={handleShowPassword} />
                ) : (
                  <IoEyeOffOutline
                    color="#023047"
                    onClick={handleShowPassword}
                  />
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
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
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
    </>
  );
};
