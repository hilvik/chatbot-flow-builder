'use client'

import { useEffect } from 'react'

export default function ErrorAlert({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-red-200 text-red-800 px-5 py-2 rounded-md font-medium">
        Cannot save Flow
      </div>
    </div>
  )
}