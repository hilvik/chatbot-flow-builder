import TextNode from './TextNode'

/**
 * Central registry for all node types
 * Add new node components here and they'll be available throughout the app
 * 
 * Key must match the 'type' field in node data
 */
export const nodeTypes = {
  textNode: TextNode,
  // Future node types:
  // imageNode: ImageNode,
  // buttonNode: ButtonNode,
  // conditionNode: ConditionNode,
}

/**
 * Node definitions for the panel
 * This drives what appears in the drag panel
 */
export const availableNodeTypes = [
  {
    type: 'textNode',
    label: 'Message',
    icon: '💬',
    description: 'Send a text message',
    defaultData: {
      message: 'Enter your message here'
    }
  },
  // Add more node types here as we build them
  // {
  //   type: 'imageNode',
  //   label: 'Image',
  //   icon: '🖼️',
  //   description: 'Send an image',
  //   defaultData: { imageUrl: '' }
  // }
]

export default nodeTypes