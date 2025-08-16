import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function HeaderNavigatorButtons() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/profile")
                  ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              Profile
            </Link>
          </nav>

          <button
            onClick={logout}
            className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </>
      ) : (
        <nav className="flex space-x-4">
          <Link
            to="/login"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/login")
                ? "px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-700 transition-colors"
                : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/register")
                ? "px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-700 transition-colors"
                : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
            }`}
          >
            Register
          </Link>
        </nav>
      )}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
