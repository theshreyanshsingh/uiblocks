'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setBetaModalOpen } from '../redux/reducers/basicData';
// import { useSession } from 'next-auth/react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  // const user = useSession();

  const menuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,

      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const hoverEffect = {
    hover: {
      scale: 1.05,
      filter: 'brightness(1.5) drop-shadow(0 0 8px rgba(255,255,255,0.6))',
      transition: { duration: 0.3 },
    },
  };

  // const handleLogin = () => {
  //   try {
  //     if (user.status !== 'authenticated') {
  //       dispatch(setLoginModalOpen(true));
  //     } else {
  //       signOut();
  //     }
  //   } catch (error) {
  //     console.log('Error opening Login Modal');
  //   }
  // };

  const handleBeta = () => {
    try {
      dispatch(setBetaModalOpen(true));
    } catch (error) {
      console.log('Error opening Login Modal', error);
    }
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={menuVariants}
        className="fixed top-0 left-0 right-0 backdrop-blur-sm z-10 "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <motion.div
              className="space-x-1 sm:space-x-2 flex justify-between items-center"
              whileHover="hover"
              variants={hoverEffect}
            >
              <Link href="/" className="flex items-center justify-center group">
                <div className="relative w-7 h-7 transform group-hover:scale-105 transition-transform">
                  <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                </div>
                <span className="ml-2.5 text-sm sm:text-lg font-semibold tracking-tight text-white">Uiblocks</span>
              </Link>
              <span className="px-1 text-[10px] font-sans font-medium text-[#141415] bg-[#E4E6EC] rounded-md">
                Beta
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.div whileHover="hover" variants={hoverEffect}>
                <Link href="/features" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </motion.div>
              {/* <motion.div whileHover="hover" variants={hoverEffect}>
                <Link href="/roadmap" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </motion.div> */}
              {/* <motion.div whileHover="hover" variants={hoverEffect}>
                <Link
                  href="https://github.com/uiblocks"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover="hover" variants={hoverEffect}>
                <Link
                  href="https://twitter.com/uiblocks"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="w-4 h-4" />
                </Link>
              </motion.div> */}
              {/* <motion.button
                onClick={handleLogin}
                whileHover="hover"
                variants={hoverEffect}
                className={`bg-white/90 text-black text-xs font-medium ${user.data?.user?.name ? 'px-2 p-1' : 'px-4 py-1'} rounded-md`}
              >
                {user.data?.user?.name ? user.data?.user?.name.charAt(0).toUpperCase() : 'Login'}
              </motion.button> */}
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={handleBeta}
                  className={`hover:bg-white/90 cursor-pointer bg-white text-black text-xs font-medium px-4 py-1 rounded-md`}
                >
                  Request Beta Access
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <motion.button
                onClick={handleBeta}
                className={`hover:bg-white/90 cursor-pointer bg-white text-black text-xs font-medium px-4 py-1 rounded-md`}
              >
                Request Beta Access
              </motion.button>
              <button onClick={() => setMenuOpen(true)}>
                <FaEllipsisVertical className="text-white w-4 h-4" />
              </button>
            </div>
            {/* <div className="md:hidden flex items-center space-x-4">
              <motion.button
                onClick={handleLogin}
                className={`bg-white/90 text-black text-xs font-medium ${user.data?.user?.name ? 'px-2 p-1' : 'px-4 py-1'} rounded-md`}
              >
                {user.data?.user?.name ? user.data?.user?.name.charAt(0).toUpperCase() : 'Login'}
              </motion.button>
              <button onClick={() => setMenuOpen(true)}>
                <FaEllipsisVertical className="text-white w-4 h-4" />
              </button>
            </div> */}
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 bg-[#0A0A0D]/80 backdrop-blur-lg flex flex-col justify-center items-center text-white z-50"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors text-sm"
            >
              ✕
            </button>

            <nav className="text-center space-y-6 text-lg">
              <Link
                href="/features"
                className="block text-gray-300 hover:text-white transition-colors font-sans font-medium text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </Link>
              {/* <Link
                href="/roadmap"
                className="block text-gray-300 hover:text-white transition-colors ont-sans font-medium text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Roadmap
              </Link> */}
            </nav>

            {/* Social Icons at Bottom */}
            {/* <div className="absolute bottom-10 flex space-x-6">
              <Link
                href="https://github.com/uiblocks"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                href="https://twitter.com/uiblocks"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="w-6 h-6" />
              </Link>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
