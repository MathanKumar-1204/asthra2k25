import React, { useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [phoneNumber, setPhoneNumber] =   useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkRegistration = async () => {
    setLoading(true);
    setError(null);
    setRegistrationStatus(null);
    try {
      const response = await axios.get(
        `https://your-backend-api.com/check-registration?phone=${phoneNumber}`
      );
      setRegistrationStatus(response.data.registered);
    } catch (err) {
      setError("Failed to fetch registration status. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Check Registration
        </h2>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={checkRegistration}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition duration-300"
        >
          {loading ? "Checking..." : "Check Registration"}
        </button>
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {registrationStatus !== null && (
          <p
            className={`mt-4 text-center text-lg font-semibold ${
              registrationStatus ? "text-green-500" : "text-red-500"
            }`}
          >
            {registrationStatus
              ? "✅ Participant is registered."
              : "❌ Participant is not registered."}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
