'use client'

export default function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-[300px] bg-white border-l border-gray-300">
      {/* panel title */}
      <div className="text-center py-2 border-b border-gray-200">
        <p className="text-gray-600 text-sm italic">Nodes Panel</p>
      </div>

      {/* draggable node */}
      <div className="p-4">
        <div
          className="border-2 border-dashed border-blue-400 rounded-lg p-4 cursor-move bg-blue-50 hover:bg-blue-100 transition-colors"
          onDragStart={(e) => onDragStart(e, 'textNode')}
          draggable
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-blue-500">💬</span>
            <span className="text-gray-700 font-medium">Message</span>
          </div>
        </div>
      </div>
    </aside>
  )
}