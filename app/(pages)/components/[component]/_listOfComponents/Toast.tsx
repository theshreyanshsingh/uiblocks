"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdClose } from "react-icons/io"; // Close icon for error toasts

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose(); // Close toast after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const toastStyles = {
    success: "bg-white",
    error: "bg-white",
    info: "bg-white",
  };

  const toastVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  // Choose the icon based on the type
  const renderIcon = () => {
    switch (type) {
      case "success":
        return <FaCheck className="text-emerald-500 text-[12px]" />;
      case "info":
        return <AiOutlineInfoCircle className="text-black text-[14px]" />;
      case "error":
        return <IoMdClose className="text-red-400 text-[14px]" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-50 mt-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`px-3 bg-white border rounded-lg shadow-md p-2 max-w-xs flex items-center space-x-2 ${toastStyles[type]}`}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className={`flex justify-center items-center h-6 w-6 rounded-full ${toastStyles[type]}`}
            >
              {renderIcon()}
            </div>
            <div className="flex-1">
              <span className="text-black text-sm font-sans font-medium">
                {message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MainToast: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "This is a success message!"
  );
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success"
  );

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => showToast("Data saved successfully!", "success")}
        className="px-3 py-2 text-white bg-black rounded-xl text-xs font-sans font-semibold"
      >
        Show Success Toast
      </button>
      <button
        onClick={() => showToast("Something went wrong!", "error")}
        className="px-3 py-2 text-white bg-black rounded-xl text-xs font-sans font-semibold mx-5"
      >
        Show Error Toast
      </button>
      <button
        onClick={() => showToast("Here's some information.", "info")}
        className="px-3 py-2 text-white bg-black rounded-xl text-xs font-sans font-semibold"
      >
        Show Info Toast
      </button>

      {/* Toast Component */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={toastVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default MainToast;
