'use client'

import { useState, useEffect } from 'react'

export default function SettingsPanel({ node, onUpdate, onClose }) {
  // initialize with empty string or existing message
  const [message, setMessage] = useState(node?.data?.message || '')

  // sync message when node changes
  useEffect(() => {
    if (node && node.data) {
      setMessage(node.data.message || '')
    }
  }, [node])

  const handleChange = (e) => {
    setMessage(e.target.value)
    // only update if we have a valid node
    if (node && node.id) {
      onUpdate(node.id, { message: e.target.value })
    }
  }

  // if no node, don't render anything
  if (!node || !node.data) {
    return null
  }

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-5">
      {/* back arrow and title */}
      <div className="mb-6">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 text-2xl mb-4"
          aria-label="Back to nodes panel"
        >
          ←
        </button>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Settings Panel</p>
        </div>
      </div>

      {/* message label */}
      <div className="mb-2">
        <p className="text-gray-600 text-sm font-medium text-center">
          Message
        </p>
      </div>

      {/* text field */}
      <div className="mb-4">
        <label className="block text-gray-500 text-xs mb-2">
          Text
        </label>
        <textarea
          value={message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-400"
          rows={3}
          placeholder="test message 2"
        />
      </div>

      <hr className="border-gray-200 my-6" />

      {/* additional info */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>Type: {node.type || 'textNode'}</p>
        <p>ID: {node.id || 'N/A'}</p>
      </div>
    </aside>
  )
}