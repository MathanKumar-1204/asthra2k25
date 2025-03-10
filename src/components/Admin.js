import React from "react";
import AdminPage from "./AdminPage";

function Admin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-700 to-blue-600 p-6">
      <div className="container bg-white shadow-2xl rounded-lg p-8 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center uppercase tracking-wide mb-6">
          Admin Panel
        </h1>

        <div className="card hover-effect">
          <AdminPage />
        </div>

        <div className="mt-6 flex justify-center space-x-4">
        </div>
      </div>
    </div>
  );
}

export default Admin;
