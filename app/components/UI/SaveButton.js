'use client'

export default function SaveButton({ onSave }) {
  return (
    <button
      onClick={onSave}
      className="absolute top-3 right-3 z-10 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded font-medium hover:bg-blue-50 transition-colors"
    >
      Save Changes
    </button>
  )
}