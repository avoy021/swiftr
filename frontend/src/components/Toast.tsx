"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto-close after 3 sec
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed top-6 left-[50%] z-50 bg-black text-white px-4 py-2 rounded-xl shadow-xl"
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
