import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
      setFullName(savedProfile.fullName || "");
      setUsername(savedProfile.username || "");
      setPreview(savedProfile.profilePic || null);
    }
  }, []);

  // Show image preview
  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(profilePic);
    }
  }, [profilePic]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Save to localStorage
    const profileData = {
      fullName,
      username,
      profilePic: preview, // base64
    };

    localStorage.setItem("userProfile", JSON.stringify(profileData));

    setMessage("✅ Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen mt-8 bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center pt-10">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
          {/* Header */}
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
            Edit Profile
          </h2>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow">
              <img
                src={preview || "https://www.w3schools.com/howto/img_avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Choose a username"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="text-blue-600 hover:underline font-medium"
              >
                Back to Home
              </button>
            </div>
          </form>

          {/* Success Message */}
          {message && (
            <div className="mt-4 text-green-600 text-center font-semibold">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
