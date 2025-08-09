'use client'

import { Handle, Position } from 'reactflow'
import { memo } from 'react'

const TextNode = memo(({ data, selected }) => {
  return (
    <div className={`
      bg-white rounded-md shadow-md
      ${selected ? 'ring-2 ring-blue-500' : ''}
      min-w-[200px]
    `}>
      {/* target handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-gray-600 !border-2 !border-white"
        style={{ top: -5 }}
      />
      
      {/* turquoise header exactly like image */}
      <div className="bg-teal-300 px-3 py-2 rounded-t-md flex items-center gap-2">
        <span className="text-sm">💬</span>
        <span className="text-xs font-bold text-gray-700">Send Message</span>
        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      
      {/* white message area */}
      <div className="px-3 py-3 bg-gray-50 rounded-b-md">
        <p className="text-gray-600 text-sm">
          {data?.message || 'test message 1'}
        </p>
      </div>

      {/* source handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-gray-600 !border-2 !border-white"
        style={{ bottom: -5 }}
      />
    </div>
  )
})

TextNode.displayName = 'TextNode'

export default TextNode