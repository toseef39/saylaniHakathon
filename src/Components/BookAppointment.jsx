import React, { useState } from "react";
import Navbar from "./Navbar";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Custom Validation
    if (name.trim().toLowerCase() === "touseef") {
      toast.error("You cannot use the name 'Touseef'");
      return;
    }

    if (phone.trim() === "1234567890") {
      toast.error("This phone number is not allowed.");
      return;
    }

    const appointmentData = {
      name,
      phone,
      reason,
      dateTime,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "appointments"), appointmentData);
      toast.success("Appointment booked successfully!");
      setName("");
      setPhone("");
      setReason("");
      setDateTime(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
      });
    } catch (error) {
      console.error("❌ Error adding document:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 to-white">
      <Navbar />

      <div className="w-full px-4 mt-8 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mb-8 text-center">
            Book Your Appointment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Reason Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Reason for Appointment
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe your reason..."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>

            {/* Date & Time Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Preferred Date & Time
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
