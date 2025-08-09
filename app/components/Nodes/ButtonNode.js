'use client'

import { Handle, Position } from 'reactflow'
import { memo } from 'react'

const ButtonNode = memo(({ data, selected, isConnectable }) => {
  const buttons = data?.buttons || []
  
  return (
    <div className={`
      bg-white border-2 rounded-md min-w-[180px] max-w-[250px]
      ${selected ? 'border-orange-500 shadow-xl' : 'border-gray-300 shadow-md'}
      transition-all duration-200 hover:shadow-lg
    `}>
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        isConnectable={isConnectable}
        className="!bg-gray-500 hover:!bg-orange-500 transition-colors"
        style={{ width: 10, height: 10, top: -5 }}
      />
      
      <div className="bg-gradient-to-r from-orange-200 to-yellow-200 px-3 py-2 rounded-t-sm flex items-center gap-2 border-b border-gray-200">
        <span className="text-sm">🔘</span>
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Button Options
        </span>
        <div className="ml-auto w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
      </div>
      
      <div className="px-3 py-3 min-h-[50px] space-y-2">
        {buttons.length > 0 ? (
          buttons.map((btn, idx) => (
            <div key={idx} className="px-2 py-1 bg-blue-100 rounded text-xs text-blue-700">
              {btn.label || `Button ${idx + 1}`}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">Click to add buttons...</p>
        )}
      </div>
      
      {/* multiple source handles for each button */}
      {buttons.map((btn, idx) => (
        <Handle
          key={`source-${idx}`}
          type="source"
          position={Position.Bottom}
          id={`button-${idx}`}
          isConnectable={isConnectable}
          className="!bg-gray-500 hover:!bg-orange-500 transition-colors"
          style={{ 
            width: 8, 
            height: 8, 
            bottom: -4,
            left: `${20 + (idx * 30)}%`
          }}
        />
      ))}
    </div>
  )
})

ButtonNode.displayName = 'ButtonNode'

export default ButtonNode