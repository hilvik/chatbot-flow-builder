'use client'

import { Handle, Position } from 'reactflow'
import { memo } from 'react'

const TextNode = memo(({ data, selected }) => {
  return (
    <div className={`
      px-4 py-2 shadow-md rounded-md bg-white border-2
      ${selected ? 'border-blue-500' : 'border-stone-400'}
      min-w-[200px]
    `}>
      {/* target handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3"
        style={{
          background: '#555',
          top: -6
        }}
      />
      
      {/* header section with icon */}
      <div className="flex items-center">
        <div className="flex items-center flex-grow">
          <div className="ml-2">
            <div className="text-xs font-bold text-gray-600 mb-1 bg-teal-200 px-2 py-1 rounded flex items-center gap-2">
              <span>💬</span>
              <span>Send Message</span>
            </div>
            <div className="text-gray-500 text-xs">
              {data?.message || 'test message 1'}
            </div>
          </div>
        </div>
      </div>

      {/* source handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3"
        style={{
          background: '#555',
          bottom: -6
        }}
      />
    </div>
  )
})

TextNode.displayName = 'TextNode'

export default TextNode