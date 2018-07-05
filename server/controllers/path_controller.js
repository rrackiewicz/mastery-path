const { convertPath } = require('./utils')
const og = require('open-graph')

module.exports = {

  //TODO: POST nop parmams, passing back pid
  createPath: (req, res) => {
    const dbInstance = req.app.get('db')
    dbInstance.new_path()
    .then((pid) => {
      //console.log("PID from server: ", pid[0])
      res.status(200).send(pid[0])
    })
    .catch(() => res.status(500).send())
  },

  assignPath: (req, res) => {
    const { mid, pid } = req.params
    const dbInstance = req.app.get('db')
    dbInstance.assign_path([mid, pid])
    .then(() => {
      console.log(`Master ${mid} assigned to path ${pid}`);
      res.status(200).send()
    })
    .catch((err) => {
      console.log("Failure assigning path")
      res.status(500).send()
    })
  },

  uploadPath: (req, res) => {
    const { pid, pub, path_name, abstract, img, learningDomain, learningSubdomains, hrs, rating, nodes } = req.body
    const dbInstance = req.app.get('db')
    //console.log("Begin uploading path")
    dbInstance.upload_path([pid, path_name, abstract, img, hrs, rating, pub])
    .then(() => {
      //console.log("Begin add tld skill")
      //console.log(pid, learningDomain)
      //FIXME: Don't call new_skill if tld skill length = 0. Therefore, pull the nested code out and run it serially like before.
      dbInstance.new_skill([pid, learningDomain, true])
      .then(() => {  
        //console.log("Successfully added tld skill")  
        learningSubdomains.forEach((e,i) => {
          dbInstance.new_skill([pid, e, false])
          .then(() => {
            //console.log(`Successfully added secondary skill ${i}`)
          })
          .catch(err => {
            console.log("--Error inserting secondary skill ")
            console.log(err)
            res.status(500).send()
          })
        })
      })
      .catch(err => {
        console.log("--Error inserting tld skill")
        console.log(err)
        res.status(500).send()
      })
    })
    .catch(() => {
      console.log("Error uploading path")
      console.log(err)
      res.status(500).send()
    })

    console.log("Begin clearing nodes")
    dbInstance.clear_nodes([pid])
    .then(() => {
      console.log("Begin Adding nodes")
      nodes.forEach((ne, ni) => {
        dbInstance.new_node([pid, ne.node_name, ni, ne.depth, ne.is_complete])
        .then(nodeId => {
          console.log("n".repeat(ni+1))
          const nid = nodeId[0].nid
          ne.content.forEach((ce, ci) => { 
            dbInstance.new_content([nid, ce.content_type, ce.content, ci])
            .then(() => {
              console.log("c".repeat(ci+1))
            })
            .catch(err => {
              console.log("--Problem inserting content")
              res.status(500).send()
            })
          }) 
        })
        .catch(err => {
          console.log("--Problem inserting node")  
          console.log(err)
          res.status(500).send()
        })
      })
    })
    .catch(err => {
      console.log("--Problem clearing nodes")
      console.log(err)
      res.status(500).send()
    })
    res.status(200).send()
  },

  //TODO: GET with uid on params
  getMasterPaths: (req, res) => {
    const uid = req.session.user
    const dbInstance = req.app.get('db')
    dbInstance.get_master_paths([ uid ])
    .then((results) => {
      res.status(200).send(results)
    })
    .catch(() => res.status(500).send())
  },

  //TODO: GET with uid on params
  getApprenticePaths: (req, res) => {
    const uid = req.session.user
    const dbInstance = req.app.get('db')
    dbInstance.get_apprentice_paths([ uid ])
    .then((results) => {
      res.status(200).send(results)
    })
    .catch(() => res.status(500).send())
  },

  //TODO: GET specific path
  getPath: (req, res) => {
    const { pid } = req.params
    const dbInstance = req.app.get('db')
    dbInstance.get_path([ pid ])
    .then(convertPath) //Promises automatically return result to next .then
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send()
    })
  },

  getUrlData(req, res) {
    const { url } = req.params
    og(url, function(err, meta){
      console.log(url, meta)
      res.status(200).send(meta)
    })
  },

  verifyPathName: (req, res) => {
    const { path_name, pid } = req.body
    const dbInstance = req.app.get('db')
    console.log(pathname)
    dbInstance.verify_path_name([ path_name, pid ])
    .then((returnedPath) => {
      console.log("catch")
      console.log(returnedPath)
      res.status(200).send(returnedPath)
    })
    .catch((err) => {
      console.log("throw")
      console.log(err);
      res.status(500).send()
    })
  }
}

// //TODO: delete
// deletePath: (req, res) => {
//   const dbInstance = req.app.get('db')
//   const { pid } = req.params
//   dbInstance.delete_path([ pid ])
//   .then((results) => {
//     res.status(200).send(results)
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).send()})
// }

// //TODO: delete
// updatePath: (req, res) => {
//   const dbInstance = req.app.get('db')
//   const { pid } = req.params
//   const { path_name, abstract, img, pub, hrs, rating} = req.body
  
//   dbInstance.update_path([pid, path_name, abstract, img, hrs, rating, pub])
//   .then(() => {
//     res.status(200).send()
//   })
//   .catch(() => res.status(500).send())
// }