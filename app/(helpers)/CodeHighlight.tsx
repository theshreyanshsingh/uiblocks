"use client";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import { BsClipboard2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

export const CodeHighlight = (codeString: string) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative h-full w-full">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 text-sm font-semibold text-black bg-white rounded-md shadow-md hover:bg-gray-50 focus:outline-none"
      >
        {copied ? <FaCheck /> : <BsClipboard2 />}
      </button>

      {/* Code Syntax Highlighter */}
      <SyntaxHighlighter
        language="javascript"
        style={atomOneDark}
        registerlanguage={["jsx", jsx]}
        customStyle={{
          fontSize: "13px", // smaller font size
          fontFamily: "'Poppins', monospace", // elegant font
          fontWeight: "500", // bolder text
          lineHeight: "1.5", // better line spacing
          padding: "1px", // added padding for better aesthetics
          borderRadius: "15px", // rounded corners for elegance
          backgroundColor: "#000", // white background
          width: "100%", // Ensure the code block takes full width available
          maxWidth: "100%", // Prevent overflow horizontally
          overflowX: "auto", // Make it scrollable horizontally if needed
          overflowY: "auto", // Make it scrollable vertically if needed
          boxSizing: "border-box", // Avoid overflow due to padding
          height: "100%",
        }}
        showLineNumbers={false}
        lineNumberStyle={{
          color: "#949494", // Custom color for line numbers (optional)
          fontWeight: "500",
          fontSize: "12px",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
