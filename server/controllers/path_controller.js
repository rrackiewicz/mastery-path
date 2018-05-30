module.exports = {

  //TODO: POST nop parmams, passing back pid
  createPath: (req, res) => {
    const dbInstance = req.app.get('db')
    dbInstance.new_path()
    .then((pid) => {
      console.log("PID from server: ", pid[0])
      res.status(200).send(pid[0])
    })
    .catch(() => res.status(500).send())
  },

  assignPath: (req, res) => {
    const dbInstance = req.app.get('db')
    const { pid, mid } = req.params
    console.log("pid: ", pid)
    console.log("mid: ", mid)
    dbInstance.assign_path([pid, mid])
    .then(() => {
      console.log(`Master ${mid} assigned to path ${pid}`);
      res.status(200).send()
    })
    .catch(() => res.status(500).send())
  }

}