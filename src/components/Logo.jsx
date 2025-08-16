import { Zap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Zap className="w-8 h-8 text-purple-600" />
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Clustify Agent
      </span>
    </Link>
  );
}
