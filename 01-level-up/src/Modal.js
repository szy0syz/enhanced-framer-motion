import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({ isToggled, setToggle, children }) => {
  return (
    <AnimatePresence>
      {isToggled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 30,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
            <button onClick={() => setToggle(false)}>Close</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
