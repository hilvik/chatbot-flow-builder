'use client'

export default function SaveButton({ onSave }) {
  return (
    <button
      onClick={onSave}
      className="absolute top-4 right-4 z-10 px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-md font-medium hover:bg-blue-600 hover:text-white transition-colors"
    >
      Save Changes
    </button>
  )
}