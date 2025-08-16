import React from "react";
import Logo from "./Logo";
import HeaderNavigatorButtons from "./HeaderNavigatorButtons";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />
          {/* Navigation & Actions */}
          <HeaderNavigatorButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
