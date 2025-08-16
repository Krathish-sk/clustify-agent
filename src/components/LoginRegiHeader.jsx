import { Zap } from "lucide-react";
import React from "react";

export default function LoginRegiHeader({ heading, title }) {
  return (
    <div className="text-center animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
          <Zap className="w-12 h-12 text-white" />
        </div>
      </div>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {heading}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}
