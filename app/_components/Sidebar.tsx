'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosAdd } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaEllipsisV } from 'react-icons/fa';
import { GoProjectRoadmap } from 'react-icons/go';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);

  const options = [{ title: 'Projects', icon: GoProjectRoadmap }];

  return (
    <>
      {/* Sidebar (Visible on Desktop) */}
      <motion.div
        className="hidden md:flex flex-col border-r bg-[#0F0F0F] border-[#201F22] p-3 space-y-10 w-auto justify-between h-screen transition-all"
        initial={{ filter: 'brightness(1)' }}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        <div className="space-y-10">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-7 h-7 transform transition-transform">
              <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
            </div>
          </Link>

          {/* Options with Hover Effect */}
          <div className="flex flex-col justify-center items-center gap-y-7">
            <motion.div
              whileHover={{ scale: 1.1, filter: 'brightness(1.3)' }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              <IoIosAdd className="text-2xl text-white bg-[#2b2a2d] rounded-md p-1" />
            </motion.div>

            {options.map((O, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, filter: 'brightness(1.3)' }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              >
                <O.icon className="text-lg text-white" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col justify-center items-center gap-y-4">
          {/* settings */}
          <motion.button
            whileHover={{ scale: 1.1, filter: 'brightness(1.3)' }}
            transition={{ duration: 0.2 }}
            className="rounded-full p-1 justify-center items-center flex cursor-pointer"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.5, scaleX: 1 }}
          >
            <IoSettingsOutline className="text-lg text-white" />
          </motion.button>
          {/* Id */}
          <motion.button
            whileHover={{ scale: 1.1, filter: 'brightness(1.3)' }}
            transition={{ duration: 0.2 }}
            className="rounded-full p-1 justify-center items-center flex cursor-pointer"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.5, scaleX: 1 }}
          >
            S
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu Button (3 Dots) */}

      <button
        className="md:hidden fixed top-4 right-4 text-white text-2xl bg-[#1D1D1F] p-2 rounded-md z-50"
        onClick={() => setMenuOpen(true)}
      >
        <FaEllipsisV className="text-sm" />
      </button>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-lg flex flex-col justify-center items-center space-y-8 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)} // Click outside to close
          >
            {/* Options */}
            {options.map((O, i) => (
              <motion.div
                key={i}
                className="text-white text-lg flex items-center space-x-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <O.icon className="text-2xl" />
                <span>{O.title}</span>
              </motion.div>
            ))}

            {/* Settings Button */}
            <motion.div
              whileHover={{ scale: 1.1, filter: 'brightness(1.3)' }}
              transition={{ duration: 0.2 }}
              className="flex space-x-6 text-white mt-10 cursor-pointer"
            >
              <IoSettingsOutline className="text-2xl" />
            </motion.div>
            {/* Bottom Icons */}
            <div className="flex flex-col justify-center items-center gap-y-4">
              <IoSettingsOutline className="text-lg text-white" />
              <motion.div
                className="rounded-full p-1 justify-center items-center flex"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.5, scaleX: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                S
              </motion.div>
            </div>
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setMenuOpen(false)}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
