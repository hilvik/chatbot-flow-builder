export const validateFlow = (nodes, edges) => {
  const errors = []

  if (nodes.length <= 1) {
    return { isValid: true, errors: [] }
  }

  // check for nodes without incoming edges (empty target handles)
  const nodesWithoutIncoming = nodes.filter(node => {
    const hasIncoming = edges.some(edge => edge.target === node.id)
    return !hasIncoming
  })

  // more than one node with empty target = error
  if (nodesWithoutIncoming.length > 1) {
    errors.push('Cannot save Flow')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}