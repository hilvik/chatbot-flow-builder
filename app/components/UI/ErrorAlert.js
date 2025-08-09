'use client'

import { useEffect } from 'react'

export default function ErrorAlert({ message, onClose }) {
  // auto close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <span className="font-medium">Cannot save Flow</span>
        <span className="text-sm">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  )
}