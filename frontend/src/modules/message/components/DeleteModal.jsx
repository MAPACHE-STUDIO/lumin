import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importar AnimatePresence y motion

export const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 w-80 shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure?
            </h3>
            <p className="text-gray-600 mb-6">
              This action will permanently delete your account and cannot be undone.
            </p>
            <div className="flex justify-between">
              
              <button
                onClick={onClose}
                className="bg-violet-500 text-white p-3 rounded-3xl"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-violet-900 text-white p-3 rounded-3xl"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
