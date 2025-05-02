import React from "react";

function AdminLogin() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-96">
        
        {/* Username */}
        <div className="flex items-center gap-4">
          <label htmlFor="username" className="w-24 text-sm font-medium text-gray-700">
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-4">
          <label htmlFor="pwd" className="w-24 text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            id="pwd"
            name="pwd"
            type="password"
            placeholder="Enter your password"
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
