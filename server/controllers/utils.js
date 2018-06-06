module.exports = {
  convertPath: arr => {
    console.log(arr)
    const { username, img, hrs, rating, path_name, abstract, pid } = arr[0]
    const path = { username, img, hrs, rating, path_name, abstract, pid, nodes:[], learningDomain: '', learningSubdomains:[] }
    return arr.reduce((ac,cv) => {
      if (!path.nodes.some(node => node.node_name === cv.node_name)) {path.nodes.push({ node_name: cv.node_name, ord: cv.ord, depth: cv.depth })}
      if (!path.learningSubdomains.some(node => node === cv.skill_name)) {
        if (cv.is_tld === true) { path.learningDomain = cv.skill_name}
      else {
        path.learningSubdomains.push(cv.skill_name)
      }
      }
      path.nodes.reverse();
      return path
    },path)
  }
}

//In the path.nodes.some and path.skills.some only check against unique values