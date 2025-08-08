import { v4 as uuidv4 } from 'uuid'
import { availableNodeTypes } from '@/app/components/Nodes/NodeTypes'

/**
 * Factory for creating new nodes
 * Centralizes node creation logic to ensure consistency
 */
class NodeFactory {
  /**
   * Create a new node instance
   * @param {string} type - Node type from availableNodeTypes
   * @param {Object} position - {x, y} coordinates for placement
   * @param {Object} customData - Override default data if needed
   */
  static createNode(type, position, customData = {}) {
    const nodeDefinition = availableNodeTypes.find(n => n.type === type)
    
    if (!nodeDefinition) {
      console.error(`Unknown node type: ${type}`)
      return null
    }

    // Generate unique ID - using uuid to avoid collisions
    const id = `${type}_${uuidv4()}`

    return {
      id,
      type,
      position,
      data: {
        ...nodeDefinition.defaultData,
        ...customData,
        // Store label for display purposes
        label: nodeDefinition.label
      },
      // Custom styling can be added per node type
      style: {
        // Width will auto-adjust based on content
      }
    }
  }

  /**
   * Validate if a node type exists
   * Useful for drag-and-drop validation
   */
  static isValidNodeType(type) {
    return availableNodeTypes.some(n => n.type === type)
  }

  /**
   * Get node definition by type
   * Used by the panel to render available nodes
   */
  static getNodeDefinition(type) {
    return availableNodeTypes.find(n => n.type === type)
  }
}

export default NodeFactory