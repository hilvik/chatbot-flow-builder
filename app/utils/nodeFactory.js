import { v4 as uuidv4 } from 'uuid'
import { availableNodeTypes } from '@/app/components/Nodes/NodeTypes'

class NodeFactory {
  // create node with type checking
  static createNode(type, position, customData = {}) {
    const nodeDefinition = availableNodeTypes.find(n => n.type === type)
    
    if (!nodeDefinition) {
      console.error(`Unknown node type: ${type}`)
      return null
    }

    const id = `${type}_${uuidv4().split('-')[0]}`

    return {
      id,
      type,
      position,
      data: {
        ...nodeDefinition.defaultData,
        ...customData,
        label: nodeDefinition.label,
        // add timestamp for debugging
        createdAt: Date.now()
      }
    }
  }

  // validate node type exists
  static isValidNodeType(type) {
    return availableNodeTypes.some(n => n.type === type)
  }

  // get node definition
  static getNodeDefinition(type) {
    return availableNodeTypes.find(n => n.type === type)
  }

  // create multiple nodes at once (useful for templates)
  static createNodesFromTemplate(template) {
    return template.map(item => 
      this.createNode(item.type, item.position, item.data)
    )
  }

  // clone existing node
  static cloneNode(node, offset = { x: 50, y: 50 }) {
    return {
      ...node,
      id: `${node.type}_${uuidv4().split('-')[0]}`,
      position: {
        x: node.position.x + offset.x,
        y: node.position.y + offset.y
      },
      selected: false
    }
  }
}

export default NodeFactory