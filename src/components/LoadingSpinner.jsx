// components/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        {/* Message */}
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
