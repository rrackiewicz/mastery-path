const initialState = {
  //feel like it would be easier to keep my user info in an object
  user: {
    username: '',
    uid: 0,
    email: '',
    img: 'https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_640.png&f=1' 
  },

  path: {
    pid: 0,
    path_name: 'New Path',
    abstract: '',
    img: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.apexcartage.com%2Fwp-content%2Fuploads%2Frevslider%2Frev_slider_example%2Fplaceholder-red.png&f=1', 
    learningDomain: '',
    learningSubdomains: [],
    hrs: 100,
    rating: 5.0,
    nodes: [
      {
        nid: 0,
        node_name: 'Root Node',
        depth: 0,
        content: [
          {
            content_type: 'h1',
            content: 'Node 1'
          },
          {
            content_type: 'p',
            content: 'Curabitur at justo sem. Aliquam eget neque interdum lectus ullamcorper fermentum. Ut quis nisi augue. Quisque nec fringilla ante, vel aliquet lacus. In pulvinar enim dui, sit amet scelerisque augue vehicula at. Nunc bibendum, nunc et euismod venenatis, neque felis euismod est, tempus luctus tortor augue vel magna. Sed posuere ligula a tortor tincidunt, non tempus libero fermentum.'
          }
        ]
      },
      {
        nid: 1,
        node_name: 'Tom',
        depth: 1,
        content: [
          {
            content_type: 'h1',
            content: 'Node 2'
          },
          {
            content_type: 'p',
            content: 'Curabitur at justo sem. Aliquam eget neque interdum lectus ullamcorper fermentum. Ut quis nisi augue. Quisque nec fringilla ante, vel aliquet lacus. In pulvinar enim dui, sit amet scelerisque augue vehicula at. Nunc bibendum, nunc et euismod venenatis, neque felis euismod est, tempus luctus tortor augue vel magna. Sed posuere ligula a tortor tincidunt, non tempus libero fermentum.'
          }
        ]
      },
      {
        nid: 2,
        node_name: 'Dick',
        depth: 1,
        content: []
      },
      {
        nid: 3,
        node_name: 'Harry',
        depth: 2,
        content: []
      },
      {
        nid: 4,
        node_name: 'Samson',
        depth: 0,
        content: []
      },
      {
        nid: 5,
        node_name: 'Goose',
        depth: 1,
        content: []
      },
      {
        nid: 6,
        node_name: 'Turkey',
        depth: 2,
        content: []
      }
    ]
  },
  
  bgColor: '',
  userContext: 'master',
  pathContext: 'path',
  isLoggedIn: false,
  mainWidth: 0,
  selectedNode: 0,
  selectedContent: [0,0,0,0,0,0,0]
}

//USER CONSTANTS
const UPDATE_USEREMAIL = "UPDATE_USEREMAIL"
const UPDATE_USERUID = "UPDATE_USERUID"
//PATH CONSTANTS
const UPDATE_PATHID = "UPDATE_PATHID"
const UPDATE_PATHNAME = "UPDATE_PATHNAME"
const UPDATE_PATHABSTRACT = "UPDATE_PATHABSTRACT"
const UPDATE_PATHIMG = "UPDATE_PATHIMG"
const UPDATE_PATHLEARNINGDOMAIN = "UPDATE_PATHLEARNINGDOMAIN"
const UPDATE_PATHLEARNINGSUBDOMAINS = "UPDATE_PATHLEARNINGSUBDOMAINS"
//PATH NODES
const UPDATE_NODENAME = "UPDATE_NODENAME"
const UPDATE_NODEDEPTH = "UPDATE_NODEDEPTH"
const UPDATE_NODEORDER = "UPDATE_NODEORDER"
const ADD_NODE = "ADD_NODE"
const DELETE_NODE = "DELETE_NODE"
const UPDATE_PATH = "UPDATE_PATH" //wholesale swap in of entire path object
//PATH CONTENT
const ADD_CONTENT = "ADD_CONTENT" 
const UPDATE_CONTENTORDER = 'UPDATE_CONTENTORDER'
const UPDATE_SELECTEDCONTENT = "UPDATE_SELECTEDCONTENT"
const UPDATE_CONTENTCONTENT = 'UPDATE_CONTENTCONTENT'
const DELETE_CONTENT = "DELETE_CONTENT"

// const UPDATE_PATHESTIMATEDHOURS = "UPDATE_PATHESTIMATEDHOURS"

//GENERAL CONSTANTS
const UPDATE_BGCOLOR = "UPDATE_BGCOLOR"
const UPDATE_USERCONTEXT = "UPDATE_USERCONTEXT"
const UPDATE_PATHCONTEXT = "UPDATE_PATHCONTEXT"
const UPDATE_LOGGEDIN = "UPDATE_LOGGEDIN"
const UPDATE_MAINWIDTH = "UPDATE_MAINWIDTH"
const UPDATE_SELECTEDNODE = "UPDATE_SELECTEDNODE"

function reducer( state = initialState, action ){ 
  switch( action.type ){

    case UPDATE_USEREMAIL:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { email: action.payload })
      })

    case UPDATE_USERUID:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { uid: action.payload })
      })

    case UPDATE_PATHID:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { pid: action.payload })
      })

    case UPDATE_PATHNAME:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { path_name: action.payload })
      })

    case UPDATE_PATHABSTRACT:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { abstract: action.payload })
      })

    case UPDATE_PATHIMG:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { img: action.payload })
      })

    case UPDATE_PATHLEARNINGDOMAIN:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { learningDomain: action.payload })
      });

    case UPDATE_PATHLEARNINGSUBDOMAINS:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { learningSubdomains: action.payload })
      })

    case UPDATE_NODENAME:
      {
        const { index, node_name } = action.payload
        const { path } = state
        let newNode = [...path.nodes]
        newNode[index].node_name = node_name;
        return Object.assign({}, state, {
          path: Object.assign({}, state.path, { nodes: newNode })
        })
      }

      case UPDATE_NODEORDER:
      {
        const { index1, index2 } = action.payload
        const { path } = state
        let newNode = [...path.nodes]
        //temp variable holds variable for swap. This is more performant than slicing.
        //try this with es6 array destructuring array matching
        let temp = newNode[index1]
        newNode[index1] = newNode[index2]
        newNode[index2] = temp

        return Object.assign({}, state, {
          path: Object.assign({}, state.path, { nodes: newNode })
        })
      }

    case UPDATE_NODEDEPTH: 
      {
        const { index, val } = action.payload
        const { path } = state
        let newNode = [...path.nodes]
        newNode[index].depth += val
        return Object.assign({}, state, {
          path: Object.assign({}, state.path, { nodes: newNode })
        })
      }

    case ADD_NODE:
      {
        const { index, depth } = action.payload
        const { path } = state
        const newNode = {
          nid: 0,
          node_name: '',
          depth: depth,
          content: []
        }
        let nodesCopy = [...path.nodes]
        nodesCopy.splice(index+1, 0, newNode)
        //Since I'm slicing a piece out, I have to renumber all the nid of the entire nodes array
        nodesCopy.map((e,i) => {
          return e.nid = i
        })

        //Tommy said that mutating state isn't a big deal if its done within Redux
        state.selectedContent.splice(index+1,0,0)

        return Object.assign({}, state, {
          path: Object.assign({}, state.path, { nodes: nodesCopy })
        })
      }
    
    case DELETE_NODE:
      {
        const { path } = state
        let nodesCopy = [...path.nodes]
        nodesCopy.splice(action.payload, 1)

        //Since I'm slicing a piece out, I have to renumber all the nid of the entire nodes array
        nodesCopy.map((e,i) => {
          return e.nid = i
        })

        //Tommy said that mutating state isn't a big deal if its done within Redux
        state.selectedContent.splice(action.payload, 1)

        return Object.assign({}, state, {
          path: Object.assign({}, state.path, { nodes: nodesCopy })
        })
      }

      case ADD_CONTENT:
      {
        const content_type = action.payload
        const { path, selectedNode, selectedContent } = state
        const { nodes } = path
        const selectedContentAtSelectedNode = selectedContent[selectedNode]

        let newContent = {
          content_type,
          content: ''
        }

        return Object.assign({}, state, {
          path: Object.assign({}, path, {
            nodes: nodes.map(node => {
              if (node.nid === selectedNode) {
                let newContentArray = [...node.content]
                newContentArray.splice(selectedContentAtSelectedNode+1, 0 , newContent)
                return Object.assign({}, node, {
                  content: newContentArray
                })
              } else {
                return node
              }
            })
          })
        })
      }
    
      case UPDATE_CONTENTORDER:
      {
        const indexToSwapWithSelectedContent = action.payload
        const { path, selectedNode, selectedContent } = state
        const { nodes } = path
        const selectedContentAtSelectedNode = selectedContent[selectedNode]

        return Object.assign({}, state, {
          path: Object.assign({}, path, {
            nodes: nodes.map((node, i) => {
              if (node.nid === selectedNode) {
                let newContent = [...node.content]
                let temp = newContent[selectedContentAtSelectedNode]
                newContent[selectedContentAtSelectedNode] = newContent[indexToSwapWithSelectedContent]
                newContent[indexToSwapWithSelectedContent] = temp
                return Object.assign({}, node, {
                  content: newContent
                })
              } else return node;
            })
          })
        })
      }

    case UPDATE_SELECTEDCONTENT:
    {
      const index = action.payload
      const { selectedNode, selectedContent } = state
      let newSelectedContent = [...selectedContent]
      newSelectedContent[selectedNode] = index
      return Object.assign({}, state, { 
        selectedContent : newSelectedContent
      })
    }

    case UPDATE_CONTENTCONTENT:
    {
      const content = action.payload
      const { path, selectedNode, selectedContent } = state
      const { nodes } = path
      const selectedContentAtSelectedNode = selectedContent[selectedNode]

      return Object.assign({}, state, {
        path: Object.assign({}, path, {
          nodes: nodes.map(node => {
            if (node.nid === selectedNode) {
              let newContentArray = [...node.content]
              newContentArray[selectedContentAtSelectedNode].content =content;
              return Object.assign({}, node, {
                content: newContentArray
              })
            } else {
              return node
            }
          })
        })
      })
    }

    case DELETE_CONTENT:
    {
      const { path, selectedNode, selectedContent } = state
      const { nodes } = path
      const selectedContentAtSelectedNode = selectedContent[selectedNode]

      return Object.assign({}, state, {
        path: Object.assign({}, path, {
          nodes: nodes.map(node => {
            if (node.nid === selectedNode) {
              let newContentArray = [...node.content]
              newContentArray.splice(selectedContentAtSelectedNode, 1)
              return Object.assign({}, node, {
                content: newContentArray
              })
            } else {
              return node
            }
          })
        })
      })
    }
 
    case UPDATE_PATH: 
      return Object.assign({}, state, { path : action.payload })

    case UPDATE_BGCOLOR:
      return Object.assign({}, state, { bgColor : action.payload })

    case UPDATE_USERCONTEXT:
      return Object.assign({}, state, { userContext : action.payload })

    case UPDATE_PATHCONTEXT:
      return Object.assign({}, state, { pathContext : action.payload })

    case UPDATE_LOGGEDIN:
      return Object.assign({}, state, { isLoggedIn : action.payload })

    case UPDATE_MAINWIDTH:
    return Object.assign({}, state, { mainWidth : action.payload })

    case UPDATE_SELECTEDNODE:
    return Object.assign({}, state, { selectedNode : action.payload })

    default: 
    return state
  }
}

export function action_updateUserEmail(id){
return {
  type: UPDATE_USEREMAIL,
  payload: id
}
}

export function action_updateUserUid(id){
return {
  type: UPDATE_USERUID,
  payload: id
}
}

export function action_updatePathId(id){
return {
  type: UPDATE_PATHID,
  payload: id
}
}
 
export function action_updatePathName(name){
  return {
    type: UPDATE_PATHNAME,
    payload: name
  }
}

export function action_updatePathAbstract(abstract){
  return {
    type: UPDATE_PATHABSTRACT,
    payload: abstract
  }
}

export function action_updatePathImg(img){
  return {
    type: UPDATE_PATHIMG,
    payload: img
  }
}

export function action_updatePathLearningDomain(learningDomain){
  return {
    type: UPDATE_PATHLEARNINGDOMAIN,
    payload: learningDomain
  }
}

export function action_updatePathLearningSubdomains(learningSubdomains){
  return {
    type: UPDATE_PATHLEARNINGSUBDOMAINS,
    payload: learningSubdomains
  }
}

export function action_updateNodeName(index, node_name){
  return {
    type: UPDATE_NODENAME,
    payload: {
      index,
      node_name
    }
  }
}

//rewritten without
export function action_updateNodeOrder(index1, index2){
  return {
    type: UPDATE_NODEORDER,
    payload: {
      index1,
      index2
    }
  }
}

export function action_updateNodeDepth(index, val){
  return {
    type: UPDATE_NODEDEPTH,
    payload: {
      index,
      val
    }
  }
}

export function action_add_node(index, depth){
  return {
    type: ADD_NODE,
    payload: {
      index,
      depth
    }
  }
}

export function action_delete_node(index){
  return {
    type: DELETE_NODE,
    payload: index
  }
}


export function action_add_content(content_type){
  return {
    type: ADD_CONTENT,
    payload: content_type
  }
}

export function action_updateContentOrder(indexToSwapWithSelectedContent){
  return {
    type: UPDATE_CONTENTORDER,
    payload: indexToSwapWithSelectedContent
  }
}

export function action_updateSelectedContent(index){
  return {
    type: UPDATE_SELECTEDCONTENT,
    payload: index
  }
}

export function action_updateContentContent(content){
  return {
    type: UPDATE_CONTENTCONTENT,
    payload: content
  }
}


export function action_delete_content(){
  return {
    type: DELETE_CONTENT
  }
}

export function action_updatePath(path){
  return {
    type: UPDATE_PATH,
    payload: path
  }
}

export function action_updateBgColor(color){
 return {
   type: UPDATE_BGCOLOR,
   payload: color
 }
}

export function action_updateUserContext(context){
 return {
   type: UPDATE_USERCONTEXT,
   payload: context
 }
}

export function action_updatePathContext(context){
 return {
   type: UPDATE_PATHCONTEXT,
   payload: context
 }
}

export function action_updateLoggedIn(bool){
 return {
   type: UPDATE_LOGGEDIN,
   payload: bool
 }
}

export function action_updateMainWidth(width){
  return {
    type: UPDATE_MAINWIDTH,
    payload: width
  }
}

export function action_updateSelectedNode(node){
  return {
    type: UPDATE_SELECTEDNODE,
    payload: node
  }
}

export default reducer 
