module.exports = {
  convertPath: arr => {
    //console.log(arr)
    //return arr
    const { img, hrs, rating, path_name, abstract, pid } = arr[0]
    const path = { img, hrs, rating, path_name, abstract, pid, nodes: [], learningDomain: '', learningSubdomains:[] }
    arr.forEach((cv) => {
      let node = path.nodes.find(node => node.nid === cv.nid)
      if (!node) {
        node = { nid: cv.nid, node_name: cv.node_name, ord: cv.node_ord, depth: cv.depth, content: [] }
        path.nodes.push(node) 
      }
      if (cv.content && !node.content.some(content => content.ord === cv.content_ord)) {
        node.content.push({ content_type: cv.content_type, content: cv.content, ord: cv.content_ord})
      }
      if (!path.learningSubdomains.some(node => node === cv.skill_name)) {
        if (cv.is_tld === true) { 
          path.learningDomain = cv.skill_name
        }
        else {
          path.learningSubdomains.push(cv.skill_name)
        }
      }
    })
    return path;
  }
}

//In the path.nodes.some and path.skills.some only check against unique values