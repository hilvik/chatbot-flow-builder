'use client'

import { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow'
import 'reactflow/dist/style.css'

import useFlowBuilder from '@/app/hooks/useFlowBuilder'
import nodeTypes from '@/app/components/Nodes/NodeTypes'
import NodesPanel from './NodesPanel'
import SettingsPanel from './SettingsPanel'
import SaveButton from '@/app/components/UI/SaveButton'
import ErrorAlert from '@/app/components/UI/ErrorAlert'
import NodeFactory from '@/app/utils/nodeFactory'

function FlowBuilderContent() {
  const reactFlowWrapper = useRef(null)
  const { project } = useReactFlow()
  
  const {
    nodes,
    edges,
    selectedNode,
    error,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    saveFlow,
    setError,
    clearSelection
  } = useFlowBuilder()

  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      
      if (!type || !NodeFactory.isValidNodeType(type)) {
        return
      }

      // get drop position relative to the flow
      const position = project({
        x: event.clientX,
        y: event.clientY,
      })

      addNode(type, position)
    },
    [project, addNode]
  )

  // find selected node
  const selectedNodeObj = selectedNode ? nodes.find(n => n.id === selectedNode) : null

  return (
    <div className="flex h-screen">
      {/* main flow canvas area */}
      <div className="flex-1 relative bg-gray-50" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={['Delete', 'Backspace']}
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { stroke: '#999', strokeWidth: 2 }
          }}
        >
          <Background color="#e0e0e0" gap={20} />
          <Controls />
        </ReactFlow>

        {/* save button positioned top right */}
        <SaveButton onSave={saveFlow} />

        {/* error message */}
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      </div>

      {/* right panel - switches between nodes panel and settings panel */}
      {selectedNodeObj ? (
        <SettingsPanel
          node={selectedNodeObj}
          onUpdate={updateNodeData}
          onClose={clearSelection}
        />
      ) : (
        <NodesPanel />
      )}
    </div>
  )
}

// main component with provider
export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowBuilderContent />
    </ReactFlowProvider>
  )
}