'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaFilePdf } from 'react-icons/fa';
import Image from 'next/image';

type AttachmentType = {
  file: File;
  preview: string;
  type: 'image' | 'video' | 'pdf';
};

type AttachmentPreviewProps = {
  attachments: AttachmentType[];
  onRemove: (index: number) => void;
};

const AttachmentPreview = ({ attachments, onRemove }: AttachmentPreviewProps) => {
  if (attachments.length === 0) return null;

  return (
    <div className="w-full flex flex-wrap gap-2 mb-2">
      <AnimatePresence>
        {attachments.map((attachment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="relative group"
          >
            {attachment.type === 'image' && (
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-md overflow-hidden">
                <Image
                  height={8}
                  width={8}
                  src={attachment.preview}
                  alt="Attachment"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {attachment.type === 'video' && (
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-black">
                <video src={attachment.preview} className="w-full h-full object-cover" />
              </div>
            )}

            {attachment.type === 'pdf' && (
              <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-[#1D1E22] flex items-center justify-center flex-col">
                <FaFilePdf className="text-white text-lg" />
                <span className="text-white text-xs font-sans font-medium mt-1 md:visible hidden">PDF</span>
              </div>
            )}

            <button
              onClick={() => onRemove(index)}
              className="absolute -top-2 -right-2 bg-[#201F22] text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <IoClose size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AttachmentPreview;
