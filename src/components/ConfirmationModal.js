// src/components/ConfirmationModal.js
import React from 'react';
import { FaTimes } from "react-icons/fa";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-neutral-900 p-6 rounded shadow-lg'>
        <button onClick={onCancel} className='absolute top-2 right-2 text-white'>
          <FaTimes size={20} />
        </button>
        <h3 className='text-lg text-white'>{message}</h3>
        <div className='flex justify-end mt-4'>
          <button onClick={onConfirm} className='py-2 px-4 bg-red-500 text-white rounded mr-2 hover:bg-red-600'>Yes</button>
          <button onClick={onCancel} className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
