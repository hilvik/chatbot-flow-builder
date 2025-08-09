import TextNode from './TextNode'

// register node types
export const nodeTypes = {
  textNode: TextNode,
  // future node types can be added here
}

// available nodes for the panel
export const availableNodeTypes = [
  {
    type: 'textNode',
    label: 'Message',
    icon: '💬',
    description: 'Send a text message',
    defaultData: {
      message: ''
    }
  }
  // extensible - add more node types here
]

export default nodeTypes