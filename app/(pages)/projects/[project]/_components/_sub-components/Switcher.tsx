import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCode, FiLayout } from 'react-icons/fi';
import { TiPen } from 'react-icons/ti';
import { setProjectMode } from '@/app/redux/reducers/projectOptions';

const Switcher = () => {
  const [selected, setSelected] = useState('edit');
  const dispatch = useDispatch();

  const allowedModes = ['edit', 'code', 'split'];

  const options = [
    { id: 'edit', icon: <TiPen className="text-lg" />, label: 'Edit' },
    { id: 'code', icon: <FiCode className="text-lg" />, label: 'Code' },
    { id: 'split', icon: <FiLayout className="text-lg" />, label: 'Split' },
  ];

  // swtcih btwn code, split and edit
  const handleMode = async (id: 'edit' | 'code' | 'split') => {
    try {
      if (allowedModes.includes(id)) {
        dispatch(setProjectMode({ mode: id }));
        setSelected(id);
      } else {
        console.error(`Invalid mode: ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //animation
  const LunarHalo = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-2 h-2 bg-[#805EF5] rounded-full top-[-6px] left-1/2 animate-lunar1 shadow-[0_0_6px_rgba(128,94,245,0.5)] opacity-60" />
      <div className="absolute w-1.5 h-1.5 bg-[#805EF5] rounded-full bottom-[-4px] right-1/3 animate-lunar2 shadow-[0_0_4px_rgba(128,94,245,0.4)] opacity-50" />
    </div>
  );

  return (
    <div className="flex bg-[#1A1A1A] rounded-md w-fit shadow-lg z-10">
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          <button
            onClick={() => {
              handleMode(option.id as 'edit' | 'split' | 'code');
            }}
            className={`relative flex items-center justify-center px-3 py-2 transition-all duration-200 z-10 ${
              selected === option.id ? 'text-[#FFFFFF]' : 'text-[#805EF5] hover:text-[#BA51CC]'
            }`}
          >
            {option.icon}
            <AnimatePresence>
              {selected === option.id && (
                <motion.div
                  layoutId="lunar-glow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-[-1]"
                >
                  <LunarHalo />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          {index < options.length - 1 && <div className="w-px h-3 bg-[#FFFFFF]/30 self-center" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Switcher;
