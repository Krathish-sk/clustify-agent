import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Upload, Send, FileText, Zap, MessageSquare, X } from "lucide-react";

import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import TipsList from "../components/TipsList";

const Home = () => {
  const { user, isLoading } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState("");
  const responseRef = useRef(null);

  if (isLoading) {
    return <LoadingSpinner message="Loading your workspace..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0] || null; // Only pick the first file
    setFiles(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    setIsProcessing(true);
    setResponse("");

    const userInputs = new FormData();
    userInputs.append("file", files);
    userInputs.append("prompt", prompt);

    try {
      const resp = await axios.post(
        // "http://localhost:5678/webhook-test/318b9995-ccf1-478a-9e10-5922e46c8ce3",
        "http://localhost:5678/webhook/318b9995-ccf1-478a-9e10-5922e46c8ce3",
        userInputs,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResponse(resp.data.data);
      //Scroll to Agent Response after a short delay so rendering finishes
      setTimeout(() => {
        if (responseRef.current) {
          responseRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      // Reset form
      setPrompt("");
      setFiles(null);
      const fileInput = document.getElementById("file-input");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.log("AI server error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setFiles(null);

    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.value = ""; // Reset file input
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 transition-all duration-500">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent mb-4">
            Welcome to Clustify Agent
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Hello,{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {user.name}
            </span>
            ! Ready to get started?
          </p>
          <p className="text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
            Enter your prompt and attach files to begin processing with our
            intelligent AI agent
          </p>
        </div>

        {/* Main Input Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8 animate-slide-up transition-all duration-300 hover:shadow-3xl">
          <div className="flex items-center mb-6">
            <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              AI Agent Interface
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
              >
                Enter your prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you'd like me to help you with..."
                rows={6}
                className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none"
                required
                disabled={isProcessing}
              />
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="file-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
              >
                Attach file (optional)
              </label>
              <div className="relative">
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept=".txt,.doc,.docx"
                  className="hidden"
                  disabled={isProcessing}
                />
                <label
                  htmlFor="file-input"
                  className="flex items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-gray-400 group-hover:text-purple-500 mx-auto mb-3 transition-colors duration-200" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      Click to upload files
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      DOC, TXT, DOCKER
                    </p>
                  </div>
                </label>
              </div>

              {/* File List */}
              {files && (
                <div className="flex items-center justify-between w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 mt-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-purple-500" />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[200px]">
                      {files.name}
                    </span>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!prompt.trim() || isProcessing}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isProcessing ? (
                // <>
                //   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                //   Processing...
                // </>
                <>
                  <div className="flex items-center space-x-3">
                    {/* Spinner */}
                    <div className="h-5 w-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>

                    {/* Text */}
                    <span className="text-sm font-medium text-purple-500">
                      Processing...
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" />
                  Send to Agent
                </>
              )}
            </button>
          </form>
        </div>

        {response && (
          <div
            ref={responseRef}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 animate-slide-up space-y-6"
          >
            {/* Header */}
            <div className="flex items-center space-x-3">
              <Zap className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Agent Response
              </h3>
            </div>

            {/* Main Message */}
            <div className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-700 shadow-inner">
              <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                {response.message}
              </p>
            </div>

            {/* Tips Section */}
            {response.dockerfile && (
              <div>
                <h4 className="flex items-center space-x-2 text-lg font-semibold text-purple-700 dark:text-purple-300 mb-4">
                  <FileText className="w-5 h-5" />
                  <span>Improvement Tips</span>
                </h4>
                <div className="grid gap-4">
                  {(() => {
                    const tips = Array.isArray(response.dockerfile)
                      ? response.dockerfile
                      : null;
                    return (
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
                        <TipsList rawOutput={response.dockerfile} />
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Footer Action */}
            <div className="flex justify-end">
              <button
                onClick={() =>
                  window.scrollTo({ top: 100, behavior: "smooth" })
                }
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
              >
                New Prompt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
