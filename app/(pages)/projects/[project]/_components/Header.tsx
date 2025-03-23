'use client';
import { NextPage } from 'next';
import React from 'react';
// import { FiGitCommit } from 'react-icons/fi';
import { LuGithub } from 'react-icons/lu';
import { LuBrain } from 'react-icons/lu';
// import { FaBrain } from 'react-icons/fa6';
import Switcher from './_sub-components/Switcher';

const Header: NextPage = () => {
  return (
    <div className="w-full p-3 flex justify-between items-center bg-[#141415] shadow-md">
      {/* Title */}
      <h3 className="text-sm font-sans font-medium text-white">Building a Chat App</h3>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Switcher />
        {/* Share */}
        <button className="text-sm font-sans font-medium text-white hover:bg-[#363637] p-1 rounded-lg">
          <LuBrain className="text-lg" />
        </button>
        {/* Share */}
        <button className="text-xs font-sans font-medium text-white hover:bg-[#363637] p-1 px-2 rounded-lg">
          Share
        </button>
        {/* Connect/ Commit to Git */}
        <button className="text-white hover:text-black  hover:bg-white border-[#949494] transition flex items-center space-x-2 px-2 rounded-lg p-1">
          <span className="text-xs hidden sm:inline">Connect with</span>
          <LuGithub />
        </button>

        {/* Deploy */}
        <button className="text-black bg-white hover:bg-gray-200 transition flex items-center hover:border-white px-2 rounded-lg p-1">
          <span className="text-xs hidden sm:inline">Deploy</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
