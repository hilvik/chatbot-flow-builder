'use client'

import { useState, useCallback } from 'react'
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow'
import NodeFactory from '@/app/utils/nodeFactory'
import { validateFlow, canConnect } from '@/app/utils/flowValidator'

/**
 * Custom hook to manage flow builder state and logic
 * Keeps the main component clean
 */
const useFlowBuilder = () => {
  // Core flow state
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  
  // UI state
  const [selectedNode, setSelectedNode] = useState(null)
  const [error, setError] = useState(null)

  // Handle node changes (move, select, etc)
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
    
    // Track selection changes
    const selectionChange = changes.find(c => c.type === 'select')
    if (selectionChange) {
      setSelectedNode(selectionChange.selected ? selectionChange.id : null)
    }
  }, [])

  // Handle edge changes (delete, etc)
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [])

  // Handle new connections with validation
  const onConnect = useCallback((params) => {
    // Validate before connecting
    const validation = canConnect(params.source, params.target, edges)
    
    if (!validation.valid) {
      setError(validation.reason)
      // Clear error after 3 seconds
      setTimeout(() => setError(null), 3000)
      return
    }

    setEdges((eds) => addEdge(params, eds))
  }, [edges])

  // Add a new node to the flow
  const addNode = useCallback((type, position) => {
    const newNode = NodeFactory.createNode(type, position)
    if (newNode) {
      setNodes((nds) => [...nds, newNode])
    }
  }, [])

  // Update node data (used by settings panel)
  const updateNodeData = useCallback((nodeId, data) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } }
        }
        return node
      })
    )
  }, [])

  // Save flow with validation
  const saveFlow = useCallback(() => {
    const validation = validateFlow(nodes, edges)
    
    if (!validation.isValid) {
      setError(validation.errors[0] || 'Cannot save flow')
      setTimeout(() => setError(null), 5000)
      return false
    }

    // Here you'd typically save to backend
    console.log('Saving flow:', { nodes, edges })
    
    // For now, just log and show success
    alert('Flow saved successfully!')
    return true
  }, [nodes, edges])

  return {
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
  }
}

export default useFlowBuilder