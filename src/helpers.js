/* =============================================================
Return a random color
============================================================= */
const colors = [
  'hsl(0, 0%, 21%)',
  //'hsl(171, 100%, 41%)', //teal
  'hsl(204, 86%, 53%)', //lblue
  'hsl(217, 71%, 53%)', //dblue
  'hsl(141, 71%, 48%)', //green
  // 'hsl(356.2, 50.2%, 49.6%)', //red
  'hsl(348, 100%, 61%)', //pink
  // 'hsl(282, 44%, 47%)', //purple
  // 'hsl(28, 80%, 52%)' //orange
]

export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getBars() {
  let bars = []
  for (let i=0; i<rand(20, 30); i++) {
    bars.push({flex : toString(rand(1,10))})
  }
  return bars;
}

export function randColor() {
  return colors[rand(0,colors.length-1)];
}

export function depthToDewey(a){
  const buffer = []
  const newArr = []
  a.forEach((e,i)=> {
    const newArrLen = newArr.length - 1
    //If the difference = 0 just add 1 to the last value in newArr
    if (e - (a[i - 1] || 0) === 0) {newArr.push(newArr[newArrLen] + 1 || 1)}
    //If the difference > 1 just add 1 to end of newArr and add the last value of newArr+1 to the buffer
    if (e - (a[i - 1]) > 0) {
      newArr.push(1)
      buffer.push(newArr[newArrLen] + 1)
      }
    else {
      //If the difference is <1 
      const iter = a[i - 1] - e //# of itererations
      //If the difference is exactly 1, take the value popped off the buffer and add it to the end of newArr
      if (iter === 1) {
        const popped = buffer.pop()
        newArr.push(popped)
      }
      else {
        //In cases where the difference is <1 but not -1 just pop values off the buffer until
        //you reach the last value. Treat the last value as if iterations = 1
        for (let j=0 ; j<iter; j++) {
          if (j === iter - 1) {
            const popped = buffer.pop()
            newArr.push(popped)
          } else {
            buffer.pop()
          }
        }
      }
    }
  })
  return newArr
}

//Pass in an array of objects and extract an array of depth values
export function extractDepth(a){
  return a.map(e => e.depth )
}

export function nextSibling(a, targetNode){
  const depthAtIndex = a[targetNode]
  //NOTE: We are slicing off the node whoes depth we are checking against
  const newArr = a.slice(targetNode+1)
  for (let i=0; i<newArr.length; i++) {
    if (newArr[i] <= depthAtIndex) {
      return i + targetNode;
    } 
  }
  return newArr.length + targetNode;
}

export function nearestParent(a, targetNode){
  const depthAtIndex = a[targetNode]
  for (let i=targetNode; i>=0; i--) {
    if (a[i] < depthAtIndex && i !== targetNode) {
      return i
    }
  }
  return targetNode //return self
}

export function rootParent(a, targetNode){
  for (let i=targetNode; i>=0; i--) {
    if (a[i] === 0) {
      return i
    }
  }
  return targetNode
}

//Generate a full dot notation path from root to selected node e.g. 1.3.4.1
export function generateDotNotationToSelected(a,i){
}

export function allChildren(a,i){
//slice @ index
//iterate until a node with the same depth is reached and return the index of the node before that one (with index added back on)
//keep a "collaped" array to store ranges {starting: 4, ending: 10} of all collapsed nodes
//before mapping over "collapsed" array, filter out these ranges first. When a node is exanded, remove it from the "collapsed" array
//This sounds like a fun problem
}

export function validateEmail(email){
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return re.test(String(email).toLowerCase())
}
