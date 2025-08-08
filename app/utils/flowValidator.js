/**
 * Flow validation utilities
 * Ensures the flow meets save requirements
 */

/**
 * Main validation function
 * Rules:
 * 1. If more than one node exists, only ONE can have an empty target
 * 2. Each source can only have ONE outgoing edge
 */
export const validateFlow = (nodes, edges) => {
  const errors = []

  // Single node flows are always valid
  if (nodes.length <= 1) {
    return { isValid: true, errors: [] }
  }

  // Check for nodes without incoming connections
  const nodesWithoutIncoming = nodes.filter(node => {
    const hasIncoming = edges.some(edge => edge.target === node.id)
    return !hasIncoming
  })

  // More than one node without incoming connection = invalid
  // We expect exactly one start node
  if (nodesWithoutIncoming.length > 1) {
    errors.push('Multiple nodes have no incoming connections. Only one start node is allowed.')
  }

  // Check for duplicate source connections
  // Group edges by source handle
  const sourceHandles = {}
  edges.forEach(edge => {
    const key = `${edge.source}-${edge.sourceHandle || 'source'}`
    if (sourceHandles[key]) {
      errors.push(`Node has multiple outgoing connections from the same handle`)
    }
    sourceHandles[key] = true
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Check if a new connection would be valid
 * Used before adding an edge
 */
export const canConnect = (source, target, edges) => {
  // Prevent self-connections
  if (source === target) {
    return { valid: false, reason: 'Cannot connect node to itself' }
  }

  // Check if source already has an outgoing edge
  const existingSourceEdge = edges.find(edge => 
    edge.source === source && edge.sourceHandle === 'source'
  )
  
  if (existingSourceEdge) {
    return { valid: false, reason: 'Source already has an outgoing connection' }
  }

  return { valid: true }
}

/**
 * Get flow statistics for debugging
 */
export const getFlowStats = (nodes, edges) => {
  return {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    nodesWithoutIncoming: nodes.filter(n => 
      !edges.some(e => e.target === n.id)
    ).length,
    nodesWithoutOutgoing: nodes.filter(n => 
      !edges.some(e => e.source === n.id)
    ).length
  }
}