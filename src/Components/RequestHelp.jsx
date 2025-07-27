import React, { useState } from "react";
import Navbar from "./Navbar";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const RequestHelp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [helpType, setHelpType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      phone,
      helpType,
      description,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "helpRequests"), formData);
      console.log("Help Request Submitted:", formData);
      toast.success("Your help request has been submitted!");

      // Reset fields
      setName("");
      setPhone("");
      setHelpType("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting help request:", error);
      toast.error("Something went wrong while submitting your request.");
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 to-white">
      <Navbar />

      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mb-8 text-center">
            Request for Help
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Type of Help */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Type of Help
              </label>
              <select
                value={helpType}
                onChange={(e) => setHelpType(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="Food">Food</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe your situation briefly..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestHelp;
