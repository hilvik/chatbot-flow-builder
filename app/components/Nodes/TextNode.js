'use client'

import { Handle, Position } from 'reactflow'

/**
 * TextNode - Basic message node for the chatbot flow
 * 
 * Has one input (target) and one output (source)
 * The green header indicates it's a send action
 */
const TextNode = ({ data, selected }) => {
  return (
    <div className={`
      bg-white border-2 rounded-md shadow-md min-w-[200px]
      ${selected ? 'border-blue-500 shadow-lg' : 'border-gray-300'}
      transition-all duration-200
    `}>
      {/* Target handle - can receive multiple connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2"
        // No limit on incoming connections
      />
      
      {/* Header with icon and label */}
      <div className="bg-teal-200 px-3 py-2 rounded-t-md flex items-center gap-2">
        <span className="text-xs">💬</span>
        <span className="text-xs font-medium text-gray-700">Send Message</span>
      </div>
      
      {/* Message content */}
      <div className="px-3 py-2">
        <p className="text-sm text-gray-600">
          {data?.message || 'Click to edit message'}
        </p>
      </div>
      
      {/* Source handle - limited to one outgoing connection */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2"
        // Validation will happen in onConnect handler
      />
    </div>
  )
}

export default TextNode