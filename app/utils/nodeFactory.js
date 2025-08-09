import { v4 as uuidv4 } from 'uuid'
import { availableNodeTypes } from '@/app/components/Nodes/NodeTypes'

class NodeFactory {
  static createNode(type, position, customData = {}) {
    const nodeDefinition = availableNodeTypes.find(n => n.type === type)
    
    if (!nodeDefinition) {
      console.error(`Unknown node type: ${type}`)
      return null
    }

    const id = `${type}_${uuidv4().split('-')[0]}`

    // ensure data object always exists
    return {
      id,
      type,
      position,
      data: {
        ...nodeDefinition.defaultData,
        ...customData,
        label: nodeDefinition.label,
        message: customData.message || nodeDefinition.defaultData.message || ''
      }
    }
  }

  static isValidNodeType(type) {
    return availableNodeTypes.some(n => n.type === type)
  }

  static getNodeDefinition(type) {
    return availableNodeTypes.find(n => n.type === type)
  }
}

export default NodeFactory