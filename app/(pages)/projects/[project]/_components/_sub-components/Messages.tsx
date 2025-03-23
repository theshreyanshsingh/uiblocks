'use client';

import { NextPage } from 'next';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import logo from '@/app/assets/logo.png';

const messages = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  text: `Message ${i + 1}`,
  sender: i % 2 === 0 ? 'user' : 'uiblocks',
  name: i % 2 === 0 ? 'You' : 'Uiblocks',
}));

const Messages: NextPage = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4 overflow-y-auto flex-1">
      {messages.map((msg, index) => (
        <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
          {/* Name & Avatar */}
          <div className="flex items-center gap-2">
            {msg.sender === 'uiblocks' && (
              <Image src={logo} alt="Bot Logo" width={20} height={20} className="rounded-md" />
            )}
            <span className="text-xs text-gray-400">{msg.name}</span>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-200 font-sans p-3">{msg.text}</p>

          {/* Separator */}
          {messages[index + 1] && messages[index + 1].sender !== msg.sender && (
            <motion.div
              className="w-full h-[1px] bg-gradient-to-r from-[#0A0A0A] via-gray-700 to-[#0A0A0A] opacity-50 my-3"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.5, scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          )}
        </div>
      ))}

      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
