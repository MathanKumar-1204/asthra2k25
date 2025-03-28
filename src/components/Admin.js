import React, { useState, useEffect } from "react";
import AdminPage from "./AdminPage";

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating auth check (replace with your actual authentication logic)
    const user = JSON.parse(localStorage.getItem("user")); // e.g., { email: "admin@example.com", role: "admin" }
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }
    setIsLoading(false); // Stop loading after check
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-xl">Checking access...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-700 to-blue-600 p-6 relative">
      <div className={`container bg-white shadow-2xl rounded-lg p-8 max-w-4xl transition-all duration-300 ${isAdmin ? "blur-0" : "blur-md"}`}>
        <h1 className="text-3xl font-extrabold text-gray-800 text-center uppercase tracking-wide mb-6">
          Admin Panel
        </h1>

        <div className="card hover-effect">
          {isAdmin && <AdminPage />}
        </div>
      </div>

      {!isAdmin && (
        <div className="absolute flex flex-col items-center justify-center text-white bg-black bg-opacity-70 p-4 rounded-lg">
          <p className="text-2xl font-bold">🚫 Only available for admins!</p>
        </div>
      )}
    </div>
  );
}

export default Admin;
