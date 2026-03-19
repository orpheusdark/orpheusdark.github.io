"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(Math.min(Math.round((current / steps) * 100), 100));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setShow(false);
          onComplete?.();
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#080810]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Monogram with animated gradient border */}
          <motion.div
            className="relative mb-10"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            {/* Spinning gradient ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, #7c3aed, #06b6d4, #ec4899, #7c3aed)",
                padding: 2,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative w-24 h-24 rounded-2xl bg-[#0f0f1a] flex items-center justify-center z-10 m-[2px]">
              <span className="text-4xl font-bold font-poppins bg-gradient-to-br from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent select-none">
                NC
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.p
            className="text-white/60 text-sm tracking-[0.3em] uppercase mb-8 font-inter"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Nirant Chavda
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <motion.p
            className="mt-3 text-white/30 text-xs tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
