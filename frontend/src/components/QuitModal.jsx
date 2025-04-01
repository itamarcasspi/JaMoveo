import React from 'react';

function QuitModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center">
      <div className="bg-white p-8 fixed rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Confirm Quit</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to quit? All users in session will be removed from the room.</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md text-white bg-red-400 hover:bg-red-700 transition-colors duration-200"
            onClick={onConfirm}
          >
            I'm Sure
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuitModal;