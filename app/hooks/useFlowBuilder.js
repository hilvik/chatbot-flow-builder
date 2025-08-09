'use client'

import { useState, useCallback } from 'react'
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow'
import NodeFactory from '@/app/utils/nodeFactory'
import { validateFlow } from '@/app/utils/flowValidator'

const useFlowBuilder = () => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [error, setError] = useState(null)

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
    
    // track selection
    changes.forEach(change => {
      if (change.type === 'select') {
        if (change.selected) {
          setSelectedNode(change.id)
        } else if (!change.selected && change.id === selectedNode) {
          setSelectedNode(null)
        }
      }
    })
  }, [selectedNode])

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [])

  const onConnect = useCallback((params) => {
    // check source handle constraint
    const hasExistingEdge = edges.some(edge => 
      edge.source === params.source
    )
    
    if (hasExistingEdge) {
      setError('Source handle can only have one outgoing edge')
      setTimeout(() => setError(null), 3000)
      return
    }

    setEdges((eds) => addEdge(params, eds))
  }, [edges])

  const addNode = useCallback((type, position) => {
    const newNode = NodeFactory.createNode(type, position)
    if (newNode) {
      setNodes((nds) => [...nds, newNode])
    }
  }, [])

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

  const clearSelection = useCallback(() => {
    setSelectedNode(null)
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        selected: false
      }))
    )
  }, [])

  const saveFlow = useCallback(() => {
    const validation = validateFlow(nodes, edges)
    
    if (!validation.isValid) {
      setError('Cannot save Flow')
      setTimeout(() => setError(null), 5000)
      return false
    }

    // simulate save
    console.log('Flow saved:', { nodes, edges })
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
    setError,
    clearSelection
  }
}

export default useFlowBuilder