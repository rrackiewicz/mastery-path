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
        node_name: 'Root Node',
        depth: 0,
        content: ''
      },
      {
        node_name: 'Tom',
        depth: 1,
        content: ''
      },
      {
        node_name: 'Dick',
        depth: 1,
        content: ''
      },
      {
        node_name: 'Harry',
        depth: 2,
        content: ''
      },
      {
        node_name: 'Samson',
        depth: 0,
        content: ''
      },
      {
        node_name: 'Goose',
        depth: 1,
        content: ''
      },
      {
        node_name: 'Turkey',
        depth: 2,
        content: ''
      },
    ]
  },
  
  bgColor: '',
  userContext: 'master',
  pathContext: 'path',
  isLoggedIn: false
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
const UPDATE_PATHNODES = "UPDATE_PATHNODES" //wholesale swap in of entire nodes array
const UPDATE_NODENAME = "UPDATE_NODENAME"
const UPDATE_NODEDEPTH = "UPDATE_NODEDEPTH"
const UPDATE_NODECONTENT = "UPDATE_NODECONTENT"
const ADD_NODE = "ADD_NODE"
const UPDATE_PATH = "UPDATE_PATH" //wholesale swap in of entire path object
// const UPDATE_PATHESTIMATEDHOURS = "UPDATE_PATHESTIMATEDHOURS"

//GENERAL CONSTANTS
const UPDATE_BGCOLOR = "UPDATE_BGCOLOR"
const UPDATE_USERCONTEXT = "UPDATE_USERCONTEXT"
const UPDATE_PATHCONTEXT = "UPDATE_PATHCONTEXT"
const UPDATE_LOGGEDIN = "UPDATE_LOGGEDIN"


function reducer( state = initialState, action ){ 
  switch( action.type ){

    case UPDATE_USEREMAIL:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { email: action.payload })
      });

    case UPDATE_USERUID:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { uid: action.payload })
      });

    case UPDATE_PATHID:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { pid: action.payload })
      });

    case UPDATE_PATHNAME:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { path_name: action.payload })
      });

    case UPDATE_PATHABSTRACT:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { abstract: action.payload })
      });

    case UPDATE_PATHIMG:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { img: action.payload })
      });

    case UPDATE_PATHLEARNINGDOMAIN:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { learningDomain: action.payload })
      });

    case UPDATE_PATHLEARNINGSUBDOMAINS:
      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { learningSubdomains: action.payload })
      });

    // case UPDATE_PATHNODES:
    //   return Object.assign({}, state, {
    //     path: Object.assign({}, state.path, { nodes: action.payload })
    //   });
    
    //
    // case UPDATE_NODEDEPTH:
    //   const { index, depth } = action.payload
    //   const { path } = state
    //   const newNode = {
    //     node_name: '',
    //     depth: depth,
    //     content: ''
    //   }
    //   return Object.assign({}, state, {
    //     path: Object.assign({}, state.path, { nodes: action.payload })
    //   });
    // //

   
    case ADD_NODE:
      const { index, depth } = action.payload
      const { path } = state
      const newNode = {
        node_name: '',
        depth: depth,
        content: ''
      }
      let nodesCopy = [...path.nodes]
      nodesCopy.splice(index+1, 0, newNode)

      return Object.assign({}, state, {
        path: Object.assign({}, state.path, { nodes: nodesCopy })
      });

    case UPDATE_PATH: 
      return Object.assign({}, state, { path : action.payload });

    case UPDATE_BGCOLOR:
      return Object.assign({}, state, { bgColor : action.payload });

    case UPDATE_USERCONTEXT:
      return Object.assign({}, state, { userContext : action.payload });

    case UPDATE_PATHCONTEXT:
      return Object.assign({}, state, { pathContext : action.payload });

    case UPDATE_LOGGEDIN:
      return Object.assign({}, state, { isLoggedIn : action.payload });

    default: 
      return state;
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

export function action_updatePathNodes(nodes){
  return {
    type: UPDATE_PATHNODES,
    payload: nodes
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

// export function action_updateNodeDepth(index, depth){
//   return {
//     type: UPDATE_NODEDEPTH,
//     payload: {
//       index,
//       node_name
//     }
//   }
// }

// export function action_updateNodeContent(index, content){
//   return {
//     type: UPDATE_NODECONTENT,
//     payload: {
//       index,
//       node_name
//     }
//   }
// }

export function action_add_node(index, depth){
  return {
    type: ADD_NODE,
    payload: {
      index,
      depth
    }
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

export default reducer 
