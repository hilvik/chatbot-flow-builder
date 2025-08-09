'use client'

import { Handle, Position } from 'reactflow'

// shared node wrapper for consistent styling
export const NodeWrapper = ({ children, selected, borderColor = 'blue' }) => {
  const borderColorClass = {
    blue: selected ? 'border-blue-500' : 'border-gray-300',
    purple: selected ? 'border-purple-500' : 'border-gray-300',
    orange: selected ? 'border-orange-500' : 'border-gray-300',
    green: selected ? 'border-green-500' : 'border-gray-300',
  }[borderColor]

  return (
    <div className={`
      bg-white border-2 rounded-md min-w-[180px] max-w-[250px]
      ${borderColorClass} ${selected ? 'shadow-xl' : 'shadow-md'}
      transition-all duration-200 hover:shadow-lg
    `}>
      {children}
    </div>
  )
}

// shared header component
export const NodeHeader = ({ icon, title, gradientFrom = 'teal', gradientTo = 'cyan' }) => {
  const gradientClass = `bg-gradient-to-r from-${gradientFrom}-200 to-${gradientTo}-200`
  
  return (
    <div className={`${gradientClass} px-3 py-2 rounded-t-sm flex items-center gap-2 border-b border-gray-200`}>
      <span className="text-sm">{icon}</span>
      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
        {title}
      </span>
      <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
    </div>
  )
}

// shared handle styles
export const handleStyle = {
  width: 10,
  height: 10,
  border: '2px solid white',
  boxShadow: '0 0 4px rgba(0,0,0,0.1)'
}