'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export function Redirecting({ show, target }: { show: boolean; target?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center
                     bg-black/70 backdrop-blur-sm text-white"
        >
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
            <div
              className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"
            ></div>
            <div
              className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"
            ></div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-8 text-lg font-semibold text-center"
          >
            Redirecting{target ? ` to ${target}` : ''}, please wait...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
