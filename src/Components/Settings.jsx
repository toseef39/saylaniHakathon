import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("terms");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileData");
    alert("Logged out successfully!");
    navigate("/");
  };

  const terms = `
1. User Responsibility
You are responsible for maintaining the confidentiality of your account information and all activities under your account.

2. Accurate Information
You must provide accurate, current, and complete information during registration and use.

3. Lawful Use
You agree to use the platform only for lawful purposes.

4. Service Changes
We may change or discontinue any part of the service without prior notice.

5. Privacy
Your data is processed in accordance with our Privacy Policy.

6. Content Ownership
All materials on the site belong to their respective owners.

7. Limitation of Liability
We are not responsible for any direct or indirect damages.

8. Termination
Your access may be suspended or terminated for violating any terms.
`;

  const privacy = `
1. Data Collection
We collect personal info like your name, email, and phone during signup or interaction.

2. Purpose of Use
We use your data to manage bookings, notify you, and improve services.

3. Sharing with Consent
Your data is never shared without your permission.

4. Security
We protect your data using encryption and industry standards.

5. Cookies & Analytics
Cookies help personalize your experience and analyze usage.

6. Control
You can access, update, or delete your data anytime.

7. Retention
Data is kept only as long as needed or required by law.

8. Children's Privacy
We don’t knowingly collect information from children under 13.

9. Policy Updates
We'll notify you when this policy changes significantly.
`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />

      <div className="w-full px-4 md:px-10 lg:px-20 py-10">
        <h2 className="text-3xl font-bold mt-10 text-blue-700 mb-8 text-center">
          Legal Information
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeTab === "terms"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              activeTab === "privacy"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg text-gray-700 leading-relaxed whitespace-pre-line max-w-5xl mx-auto text-sm sm:text-base">
          {activeTab === "terms" && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                Terms & Conditions
              </h3>
              {terms}
            </>
          )}

          {activeTab === "privacy" && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                Privacy Policy
              </h3>
              {privacy}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
