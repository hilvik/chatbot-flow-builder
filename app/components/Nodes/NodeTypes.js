import TextNode from './TextNode'

// node types registry
export const nodeTypes = {
  textNode: TextNode,
  // extensible - add more node types here in future
}

// available nodes in the panel
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
  // can add more node types here later
]

export default nodeTypes