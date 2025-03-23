'use client';

import { setprojectFiles } from '@/app/redux/reducers/projectFiles';
import { NextPage } from 'next';
import React, { useState, useRef } from 'react';
import { BsArrowUp } from 'react-icons/bs';
import { FaPaperclip } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

function sanitizeJSON(jsonString: string) {
  // Remove triple backticks and potential "json" labels
  return jsonString.replace(/```json|```/g, '').trim();
}

const Keyboard: NextPage = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('sent');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `A webapp clone of whatsapp`,
        framework: 'reactjs',
        cssLibrary: 'tailwindcss',
        memory: `use vite`,
      }),
    });

    const data = await res.json();
    const sanitizedData = sanitizeJSON(data.code);
    console.log(data.code, sanitizedData, typeof sanitizedData);
    try {
      const rawfiles = JSON.parse(sanitizedData);
      console.log(rawfiles?.generatedFiles);
      dispatch(setprojectFiles(rawfiles?.generatedFiles));
    } catch (err) {
      console.error('JSON parse error:', err);
    }

    if (!message.trim()) return;

    console.log('Sent message:', message);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <form
      name="keyboard"
      onSubmit={handleMessage}
      className="flex flex-col items-start justify-between rounded-lg space-y-3"
    >
      {/* Text Area (Auto-Expanding) */}
      <textarea
        ref={textareaRef}
        className="flex-1 bg-transparent outline-none text-white w-full p-1 text-sm resize-none overflow-y-auto rounded-lg min-h-[60px] max-h-[150px]"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          adjustTextareaHeight();
        }}
        onInput={adjustTextareaHeight}
      />
      <div className="flex justify-between items-center w-full">
        {/* Attach Icon */}
        <button
          type="button"
          className="hover:text-white transition p-1 flex justify-center items-center gap-x-2 text-xs font-sans text-[#70717B] bg-[#1F2125] font-medium rounded-lg px-2"
        >
          <FaPaperclip className="text-sm" /> Attach
        </button>
        {/* Send */}
        <button
          onClick={handleMessage}
          type="button"
          className="hover:bg-white hover:text-black transition p-1 flex justify-center items-center gap-x-2 text-xs font-sans text-[#70717B] bg-[#1F2125] font-medium rounded-lg px-2"
        >
          <BsArrowUp className="text-sm" />
        </button>
      </div>
    </form>
  );
};

export default Keyboard;
