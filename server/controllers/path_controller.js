const { convertPath } = require('./utils')

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
    const dbInstance = req.app.get('db')
    const { pid, mid } = req.params
    // console.log("pid: ", pid)
    // console.log("mid: ", mid)
    dbInstance.assign_path([pid, mid])
    .then(() => {
      // console.log(`Master ${mid} assigned to path ${pid}`);
      res.status(200).send()
    })
    .catch(() => res.status(500).send())
  },

  uploadPath: (req, res) => {
    const dbInstance = req.app.get('db')
    const { pid } = req.params
    const { path_name, abstract, img, learningDomain, learningSubdomains, hrs, rating, nodes } = req.body
    dbInstance.upload_path([pid, path_name, abstract, img, hrs, rating])
    .then(() => {
      res.status(200).send()
    })
    .catch(() => res.status(500).send())

    //TODO: Add in check for existing skill in entry
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

    nodes.forEach((e,i) => {
      //I think I need another .sql file here to empty out table before inserting then nest 2nd query inside of it. Verify with Tommy.
      dbInstance.new_node([pid, e.node_name, e.content, i, e.depth]) //using i for order because we don't store the order on the client side. The index of the array determines its order
      .then(() => {
        res.status(200).send()
      })
      .catch(() => res.status(500).send())
    })

  },

  //TODO: GET with uid on params
  getMasterPaths: (req, res) => {
    const dbInstance = req.app.get('db')
    const { uid } = req.params
    dbInstance.get_master_paths([ uid ])
    .then((results) => {
      res.status(200).send(results)
    })
    .catch(() => res.status(500).send())
  },

  //TODO: GET with uid on params
  getApprenticePaths: (req, res) => {
    const dbInstance = req.app.get('db')
    const { uid } = req.params
    dbInstance.get_apprentice_paths([ uid ])
    .then((results) => {
      res.status(200).send(results)
    })
    .catch(() => res.status(500).send())
  },

  //TODO: GET with searchid on params
  getPath: (req, res) => {
    const dbInstance = req.app.get('db')
    const { pid } = req.params
    dbInstance.get_path([ pid ])
    .then(convertPath) //Promises automatically return result to next .then
    .then((results) => {
      res.status(200).send(results)
    })
    .catch(() => res.status(500).send())
  }
}