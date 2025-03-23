'use client';
import { useEffect, useState, useRef } from 'react';
import Header from './_components/Header';
import { motion } from 'framer-motion';
import { Spotlight } from './_components/Spotlight';
// import { useRouter } from 'next/navigation';
import { FaArrowRight, FaPaperclip } from 'react-icons/fa';
import { setBetaModalOpen } from './redux/reducers/basicData';
import { useDispatch } from 'react-redux';
import AttachmentPreview from './_components/AttachmentPreview';
// import { useSession } from 'next-auth/react';

const Page = () => {
  const [input, setInput] = useState('');
  // const [memory, setMemory] = useState("");
  const [placeholder, setPlaceholder] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [attachments, setAttachments] = useState<
    Array<{
      file: File;
      preview: string;
      type: 'image';
    }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  // const router = useRouter();
  const mainContentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const inputBoxVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const typewriterTexts = [
    'Build a Paint App...',
    'Create a Chess Game...',
    'Develop a Blog Website...',
    'Design a Music Player...',
    'Make a Chat app...',
  ];

  useEffect(() => {
    const currentText = typewriterTexts[textIndex];

    const typingSpeed = isDeleting ? 50 : 100; // Faster delete speed
    const nextCharIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    const updateText = () => {
      setPlaceholder(currentText.substring(0, nextCharIndex));

      if (!isDeleting && nextCharIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && nextCharIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
      }
      setCharIndex(nextCharIndex);
    };

    const timeout = setTimeout(updateText, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Limit to 3 attachments
    if (attachments.length >= 3) {
      alert('You can only attach up to 3 files');
      return;
    }

    const newFile = files[0];

    // Validate file type
    const validImageTypes = [
      'image/jpeg',
      'image/png',
      // "image/gif",
      // "image/webp",
    ];
    // const validVideoTypes = ["video/mp4", "video/webm"];
    // const validPdfTypes = ["application/pdf"];

    const isValidType = [
      ...validImageTypes,
      // ...validVideoTypes,
      // ...validPdfTypes,
    ].includes(newFile.type);

    if (!isValidType) {
      alert('Please upload only images.');
      return;
    }

    // Create file preview
    // let fileType: "image" | "video" | "pdf";
    let fileType: 'image';
    if (validImageTypes.includes(newFile.type)) {
      fileType = 'image';
    }
    // else if (validVideoTypes.includes(newFile.type)) {
    //   fileType = "video";
    // }
    // else {
    //   fileType = "pdf";
    // }

    const filePreview = URL.createObjectURL(newFile);
    // const filePreview = fileType !== "pdf" ? URL.createObjectURL(newFile) : "";

    setAttachments((prev) => [
      ...prev,
      {
        file: newFile,
        preview: filePreview,
        type: fileType,
      },
    ]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => {
      const newAttachments = [...prev];
      // Revoke object URL to avoid memory leaks
      if (newAttachments[index].preview) {
        URL.revokeObjectURL(newAttachments[index].preview);
      }
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      attachments.forEach((attachment) => {
        if (attachment.preview) {
          URL.revokeObjectURL(attachment.preview);
        }
      });
    };
  }, [attachments]);

  //test

  // const [generatedCode, setGeneratedCode] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');
  const [framework, setFramework] = useState('Next.js'); // Default to Next.js
  const [cssLibrary, setCssLibrary] = useState('Tailwind CSS'); // Default
  const [memory, setMemory] = useState('');

  // const user = useSession();

  const handleGenerate = async () => {
    // setError('');
    // setGeneratedCode('');
    // setLoading(true);

    // sessionStorage.setItem('input', input);
    // sessionStorage.setItem('memory', memory);
    // sessionStorage.setItem('framework', framework);
    // sessionStorage.setItem('css', cssLibrary);
    // const characters = 'abcdefghijklmnopqrstuvwxyz123456789';
    // const projectId = Array.from({ length: 32 }, () =>
    //   characters.charAt(Math.floor(Math.random() * characters.length)),
    // ).join('');

    // sessionStorage.setItem('projectId', projectId);

    // if (user.status === 'authenticated') {
    //   router.push('/projects');
    // } else {
    //   dispatch(setLoginModalOpen(true));
    // }

    dispatch(setBetaModalOpen(true));
  };

  return (
    <main className="min-h-screen bg-[#0A0A0D] grid grid-cols-1 gap-10 md:gap-16 px-6 py-24 overflow-hidden relative">
      {/* Spotlight Effect */}
      <Spotlight />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto mt-10 justify-center items-center flex">
        <motion.div initial="hidden" animate="visible" variants={mainContentVariants} className="text-center space-y-5">
          <h1 className="text-2xl sm:text-6xl text-balance font-bold text-white tracking-tight leading-tight">
            Prompt it, tweak it,
            <span className="bg-gradient-to-r from-[#7661F4] to-[#FF7AFF] text-transparent bg-clip-text">
              {'  '}ship it
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-[#b1b1b1] font-medium max-w-xl mx-auto">
            Your <span className="text-[#7661F4]">AI Frontend Engineer</span>, built to take your ideas from concept to
            reality and beyond!
          </p>
        </motion.div>
      </section>

      {/* Input Section */}
      <section aria-label="prompt-input" className="w-full max-w-2xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={inputBoxVariants} className="w-full space-y-4">
          {/*  TEXT INPUT (FIRST) */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-[#141415] rounded-lg p-4 flex flex-col items-start justify-center shadow-lg min-h-[120px] w-full"
          >
            {/* Attachment Preview */}
            <AttachmentPreview attachments={attachments} onRemove={handleRemoveAttachment} />

            <textarea
              placeholder={placeholder}
              className="flex-1 bg-transparent text-white outline-none text-sm resize-none w-full min-h-[100px] max-h-[250px] overflow-hidden scrollbar-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();

                  if (input.trim()) {
                    handleGenerate();
                  }
                }
              }}
            />

            {/* Action Buttons */}
            <div className="justify-between items-center flex w-full">
              <button
                onClick={handleAttachClick}
                className="cursor-pointer text-[#71717A] bg-[#201F22] px-2 p-1 rounded-md text-xs font-sans font-medium gap-x-1 flex justify-center items-center hover:bg-[#2a292c] transition-colors"
              >
                <FaPaperclip />
                Attach
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*,application/pdf"
                className="hidden"
              />
              <button
                onClick={handleGenerate}
                className="cursor-pointer hover:bg-gray-200 text-[#71717A] bg-white p-2 rounded-md text-xs font-sans font-medium gap-x-1 flex justify-center items-center"
              >
                <FaArrowRight />
              </button>
            </div>
          </motion.div>

          {/*  FRAMEWORK & CSS DROPDOWNS (SECOND) */}
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm space-y-2 md:space-y-0">
            <div className="flex flex-col w-full md:w-[48%]">
              <label className="mb-1 text-gray-500">Choose Your Framework</label>
              {/* Arrow */}
              <div className="relative w-full">
                <select
                  value={framework}
                  onChange={(e) => {
                    setFramework(e.target.value);
                  }}
                  className="bg-[#141415] text-white px-3 p-2 pr-10 rounded-md outline-none appearance-none w-full"
                >
                  <option value="next">Next.js</option>
                  <option value="react">React</option>
                  <option value="vue">Vue.js</option>
                  <option value="Basic HTML">Basic HTML</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col w-full md:w-[48%]">
              <label className="mb-1 text-gray-500">Choose Your CSS</label>
              <div className="relative">
                <select
                  value={cssLibrary}
                  onChange={(e) => {
                    setCssLibrary(e.target.value);
                  }}
                  className="bg-[#141415] text-white px-3 p-2 pr-10 rounded-md outline-none appearance-none w-full"
                >
                  <option value="tailwind">Tailwind CSS</option>
                  <option value="css">CSS</option>
                  <option value="sass">SASS</option>
                  <option value="Styled Components">Styled Components</option>
                </select>
                <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/*  MEMORY SECTION (LAST) */}
          <div aria-label="actions" className="w-full max-w-2xl mx-auto mt-3 gap-y-3">
            <label className="text-gray-500 text-sm">Memory - eg. Dark mode. Sharp edges. Always!</label>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="border border-[#1D1D1F] p-3 rounded-lg min-h-[150px]"
            >
              <textarea
                className="w-full bg-transparent text-white outline-none mt-1 text-sm resize-none min-h-[130px] overflow-y-auto"
                placeholder="Keep in mind that..."
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                rows={4}
              />
            </motion.div>
          </div>

          <>
            {/* Line */}
            <motion.div
              className="w-full h-[1px] bg-gradient-to-r from-[#0A0A0A] via-white to-[#0A0A0A] opacity-50 my-10"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.5, scaleX: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            {/*  IMPORT BUTTONS (THIRD) - web */}
            <div className="hidden sm:block relative group ">
              <nav className=" grid grid-cols-2 md:grid-cols-4 gap-3 text-sm group-hover:blur-sm transition-all duration-300">
                {['Import from Github', 'Import from Web', 'Import from Figma', 'Upload'].map((text, index) => (
                  <motion.button
                    key={index}
                    whileHover="hover"
                    variants={buttonHoverVariants}
                    className="text-gray-400 hover:text-white border border-[#1D1D1F] backdrop-blur-md px-2 sm:px-4 py-2 rounded-md transition-all truncate text-xs sm:text-sm flex items-center justify-center h-10 sm:h-auto"
                  >
                    {text}
                  </motion.button>
                ))}
              </nav>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                <span className="text-white font-medium font-sans text-sm px-4 py-2 rounded-md">Coming Soon</span>
              </div>
            </div>

            {/*  IMPORT BUTTONS (THIRD) - mobile */}
            <div className=" md:hidden relative  ">
              <nav className=" grid grid-cols-2 md:grid-cols-4 gap-3 text-sm blur-[1.5px] transition-all duration-300">
                {['Import from Github', 'Import from Web', 'Import from Figma', 'Upload'].map((text, index) => (
                  <motion.button
                    key={index}
                    whileHover="hover"
                    variants={buttonHoverVariants}
                    className="text-gray-400 hover:text-white border border-[#1D1D1F] backdrop-blur-md px-2 sm:px-4 py-2 rounded-md transition-all truncate text-xs sm:text-sm flex items-center justify-center h-10 sm:h-auto"
                  >
                    {text}
                  </motion.button>
                ))}
              </nav>
              <div className="absolute inset-0 flex items-center justify-center  opacity-100 transition-opacity duration-300 z-50">
                <span className="text-white font-medium font-sans text-xs md:text-sm px-4 py-2 rounded-md">
                  Coming Soon
                </span>
              </div>
            </div>
          </>
        </motion.div>
      </section>
    </main>
  );
};

export default Page;
