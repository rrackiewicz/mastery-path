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

  uploadDescription: (req, res) => {
    const dbInstance = req.app.get('db')
    const { pid } = req.params
    const { path_name, abstract, img, learningDomain, learningSubdomains, hrs, rating, nodes } = req.body
    console.log(pid)
    dbInstance.upload_description([pid, path_name, abstract, img, hrs, rating])
    .then(() => {
      res.status(200).send()
    })
    .catch(() => res.status(500).send())

    //NOTE: Not currently checking for existing skill and this should be eventually nested to avoid
    //race conditions
    dbInstance.new_skill([pid, learningDomain, true])
    .then(() => {
      res.status(200).send()
    })
    .catch(() => res.status(500).send())

    learningSubdomains.forEach((e,i)=> {
      dbInstance.new_skill([pid, e, false])
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