import React from "react";
import Navbar from "./Components/Navbar";


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
     <div className="flex-grow flex items-center justify-center relative z-10 px-6 py-10 text-black text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Sylani Booking Appointment
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Book appointments for welfare programs, training, and job support from Saylani Welfare Trust.
          </p>
          <a
            href="/book-appointment"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
