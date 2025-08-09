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

      const position = project({
        x: event.clientX,
        y: event.clientY,
      })

      addNode(type, position)
    },
    [project, addNode]
  )

  // find selected node - with null safety
  const selectedNodeObj = selectedNode ? nodes.find(n => n.id === selectedNode) : null

  // only show settings panel if we have a valid selected node
  const showSettings = selectedNodeObj && selectedNodeObj.data

  return (
    <div className="flex h-screen bg-gray-100">
      {/* main canvas area */}
      <div className="flex-1 relative" ref={reactFlowWrapper}>
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
        >
          <Background variant="dots" gap={20} size={1} color="#ddd" />
          <Controls />
        </ReactFlow>

        {/* save button top right */}
        <SaveButton onSave={saveFlow} />

        {/* error message */}
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      </div>

      {/* right panel - switches between nodes and settings */}
      {showSettings ? (
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

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowBuilderContent />
    </ReactFlowProvider>
  )
}