'use client'

import { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow'
import 'reactflow/dist/style.css'
import '@/app/styles/flowBuilder.css'

import useFlowBuilder from '@/app/hooks/useFlowBuilder'
import nodeTypes from '@/app/components/Nodes/NodeTypes'
import NodesPanel from './NodesPanel'
import SettingsPanel from './SettingsPanel'
import SaveButton from '@/app/components/UI/SaveButton'
import ErrorAlert from '@/app/components/UI/ErrorAlert'
import NodeFactory from '@/app/utils/nodeFactory'

// need to wrap component to use useReactFlow hook
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
    setError
  } = useFlowBuilder()

  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // handle drag over to enable drop
  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // handle drop from nodes panel
  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      
      // check if dropped item is valid node type
      if (!type || !NodeFactory.isValidNodeType(type)) {
        return
      }

      // get position where node was dropped
      const position = project({
        x: event.clientX,
        y: event.clientY,
      })

      // create and add the node
      addNode(type, position)
    },
    [project, addNode]
  )

  // get the selected node object
  const selectedNodeObject = nodes.find(n => n.id === selectedNode)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* main flow canvas */}
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
          className="bg-gray-50"
        >
          <Background color="#aaa" gap={16} />
          <Controls className="bg-white" />
        </ReactFlow>

        {/* save button - top right */}
        <SaveButton onSave={saveFlow} />

        {/* error alert */}
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
      </div>

      {/* side panels */}
      {selectedNodeObject ? (
        <SettingsPanel
          node={selectedNodeObject}
          onUpdate={updateNodeData}
          onClose={() => onNodesChange([{ id: selectedNode, type: 'select', selected: false }])}
        />
      ) : (
        <NodesPanel />
      )}
    </div>
  )
}

// main export with provider
export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowBuilderContent />
    </ReactFlowProvider>
  )
}