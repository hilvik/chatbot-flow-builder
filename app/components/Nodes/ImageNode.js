'use client'

import { Handle, Position } from 'reactflow'
import { memo } from 'react'

// example of how easy it is to add new node types
const ImageNode = memo(({ data, selected, isConnectable }) => {
  return (
    <div className={`
      bg-white border-2 rounded-md min-w-[180px] max-w-[250px]
      ${selected ? 'border-purple-500 shadow-xl' : 'border-gray-300 shadow-md'}
      transition-all duration-200 hover:shadow-lg
    `}>
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        isConnectable={isConnectable}
        className="!bg-gray-500 hover:!bg-purple-500 transition-colors"
        style={{ width: 10, height: 10, top: -5 }}
      />
      
      <div className="bg-gradient-to-r from-purple-200 to-pink-200 px-3 py-2 rounded-t-sm flex items-center gap-2 border-b border-gray-200">
        <span className="text-sm">🖼️</span>
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Send Image
        </span>
        <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
      </div>
      
      <div className="px-3 py-3 min-h-[50px]">
        {data?.imageUrl ? (
          <div className="space-y-2">
            <img 
              src={data.imageUrl} 
              alt="Preview" 
              className="w-full h-24 object-cover rounded"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
            <p className="text-xs text-gray-500 truncate hidden">Invalid image URL</p>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">Click to add image URL...</p>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        isConnectable={isConnectable}
        className="!bg-gray-500 hover:!bg-purple-500 transition-colors"
        style={{ width: 10, height: 10, bottom: -5 }}
      />
    </div>
  )
})

ImageNode.displayName = 'ImageNode'

export default ImageNode