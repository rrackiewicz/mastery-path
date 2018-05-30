const initialState = {
  //feel like it would be easier to keep my user info in an object
  user: {
    username: 'Ray Rack',
    uid: 1,
    img: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fshop.mycustomhotwheels.com%2Fwp-content%2Fuploads%2F2016%2F12%2Fdonut-homer-2.jpg%3Fa788e6&f=1' 
  },

  path: {
    pid: 0,
  },
  
  bgColor: '',
  userContext: 'apprentice',
  pathContext: 'path',
  isLoggedIn: false
}

const UPDATE_BGCOLOR = "UPDATE_BGCOLOR";
const UPDATE_USERCONTEXT = "UPDATE_USERCONTEXT";
const UPDATE_PATHCONTEXT = "UPDATE_PATHCONTEXT";
const UPDATE_PATHID = "UPDATE_PATHID";
const UPDATE_LOGGEDIN = "UPDATE_LOGGEDIN"

function reducer( state = initialState, action ){ 
  switch( action.type ){
    case UPDATE_BGCOLOR:
      return Object.assign({}, state, { bgColor : action.payload });

    case UPDATE_USERCONTEXT:
      return Object.assign({}, state, { userContext : action.payload });

    case UPDATE_PATHCONTEXT:
    return Object.assign( {}, state, { pathContext : action.payload });

    case UPDATE_PATHID:
    return Object.assign( {}, state, { path : action.payload });

    case UPDATE_LOGGEDIN:
    return Object.assign( {}, state, { isLoggedIn : action.payload });

    default: 
      return state;
   }
}

export function action_updateBgColor(color){
  //console.log("payload: ", color)
 return {
   type: UPDATE_BGCOLOR,
   payload: color
 }
}

export function action_updateUserContext(context){
  //console.log("payload: ", context)
 return {
   type: UPDATE_USERCONTEXT,
   payload: context
 }
}

export function action_updatePathContext(context){
  //console.log("payload: ", context)
 return {
   type: UPDATE_PATHCONTEXT,
   payload: context
 }
}

export function action_updatePathId(path){
  //console.log("payload: ", context)
 return {
   type: UPDATE_PATHID,
   payload: path
 }
}

export function action_updateLoggedIn(bool){
  //console.log("payload: ", context)
 return {
   type: UPDATE_LOGGEDIN,
   payload: bool
 }
}



export default reducer; 
