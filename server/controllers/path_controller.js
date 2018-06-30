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
    dbInstance.upload_path([pid, pub, path_name, abstract, img, hrs, rating])
    .then(() => {
      console.log("Path successfully updated")
      res.status(200).send()
    })
    .catch(() => res.status(500).send())

    dbInstance.new_skill([pid, learningDomain, true])
    .then(() => {
      res.status(200).send()
    })
    .catch(() => res.status(500).send())

    learningSubdomains.forEach(e => {
      dbInstance.new_skill([pid, e, false])
      .then(() => {
        res.status(200).send()
      })
      .catch(() => res.status(500).send())
    })
  
    //Clear nodes deletes all copies of existing nodes at path pid before inserting the new copy of nodes
    dbInstance.clear_nodes([pid])
    .then(() => {
      nodes.forEach((ne, ni) => {
        dbInstance.new_node([pid, ne.node_name, ni, ne.depth])
        .then((nodeId) => {
          // console.log(`Node successfully inserted for path ${pid`)
          const nid = nodeId[0].nid
          ne.content.forEach((ce, ci) => {
            dbInstance.new_content([nid, ce.content_type, ce.content, ci])
            .then(() => {
              // console.log(`Content successfully inserted at node ${nid`)
            })
            .catch(() => {
              console.log("Problem inserting content") 
              res.status(500).send()
            })
          })
          res.status(200).send()
        })
        .catch(() => {
          console.log("Problem inserting node")  
          res.status(500).send()
        })
      })
    })
    .catch(() => {
      console.log("Problem clearing nodes")
      res.status(500).send()
    })
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
      res.status(500).send()})
  },

  getUrlData(req, res) {
    const { url } = req.params
    og(url, function(err, meta){
      console.log(url, meta)
      res.status(200).send(meta)
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