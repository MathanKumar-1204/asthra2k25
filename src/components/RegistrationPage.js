import React, { useState } from "react";

function RegistrationPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validatePhone = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Validates a 10-digit number starting with 6-9
    return phoneRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setError("⚠ Please enter a valid phone number!");
    } else {
      setError("");
      alert("🎉 Registration Successful!"); // Replace with actual submission logic
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register Now</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-semibold">Phone Number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter phone number"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
