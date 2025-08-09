'use client'

import { useState, useEffect } from 'react'

export default function SettingsPanel({ node, onUpdate, onClose }) {
  const [message, setMessage] = useState('')

  // sync message with node
  useEffect(() => {
    if (node?.data?.message !== undefined) {
      setMessage(node.data.message)
    }
  }, [node])

  const handleChange = (e) => {
    const newMessage = e.target.value
    setMessage(newMessage)
    // real-time update
    if (node?.id) {
      onUpdate(node.id, { message: newMessage })
    }
  }

  if (!node || !node.data) {
    return null
  }

  return (
    <aside className="w-[300px] bg-white border-l border-gray-300">
      {/* header with back arrow */}
      <div className="flex items-center py-2 px-4 border-b border-gray-200">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 text-xl"
        >
          ←
        </button>
        <p className="flex-1 text-center text-gray-600 text-sm italic">Settings panel</p>
      </div>

      {/* message settings */}
      <div className="p-4">
        <div className="text-center mb-4">
          <p className="text-gray-700 font-medium">Message</p>
        </div>

        <div>
          <label className="block text-gray-500 text-xs mb-1">Text</label>
          <textarea
            value={message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 resize-none"
            rows={3}
            placeholder="test message 2"
          />
        </div>
      </div>
    </aside>
  )
}