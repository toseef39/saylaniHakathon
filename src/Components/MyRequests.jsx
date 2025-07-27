import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { db } from "../firebase";
import {
  collection,
  onSnapshot
} from "firebase/firestore";

const MyRequests = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);

  // Fetch data from Firestore in real-time
  useEffect(() => {
    const unsubAppointments = onSnapshot(collection(db, "appointments"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
    });

    const unsubHelpRequests = onSnapshot(collection(db, "helpRequests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHelpRequests(data);
    });

    return () => {
      unsubAppointments();
      unsubHelpRequests();
    };
  }, []);

  const getStatusBadge = (status) => {
    const color =
      status === "Pending"
        ? "bg-yellow-100 text-yellow-800"
        : status === "Approved"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${color}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-12">
        <h1 className="text-2xl sm:text-3xl mt-10 md:text-4xl font-bold text-center text-blue-700 mb-10">
          My Requests
        </h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeTab === "appointments"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("help")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeTab === "help"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Help Requests
          </button>
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-5">
            {appointments.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.reason}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Date: {new Date(item.dateTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Requests Tab */}
        {activeTab === "help" && (
          <div className="space-y-5">
            {helpRequests.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.type}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
