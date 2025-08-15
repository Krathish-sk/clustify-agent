import React, { useState } from "react";
import { Lightbulb, Copy, Check } from "lucide-react";

export default function TipsList({ rawOutput }) {
  const [copied, setCopied] = useState(false);

  function parseDynamicList(rawText) {
    return rawText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        let clean = line.replace(/^\s*(\d+\.\s*|\-\s*|\*\s*)/, "");
        let match = clean.match(/^\*{0,2}([^*:\-]+?)\*{0,2}\s*[:\-—]\s*(.*)$/);

        if (match) {
          return {
            title: match[1].trim(),
            description: match[2].trim(),
          };
        } else {
          return { title: clean.trim(), description: "" };
        }
      });
  }

  const tips = parseDynamicList(rawOutput);

  const handleCopy = () => {
    const textToCopy = tips
      .map((tip) =>
        tip.description ? `${tip.title}: ${tip.description}` : tip.title
      )
      .join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute right-0 top-0 flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-1" /> Copied
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-1" /> Copy All
          </>
        )}
      </button>

      {/* Tips List */}
      <ul className="space-y-3 mt-6">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {tip.title}
              </p>
              {tip.description && (
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-snug">
                  {tip.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
