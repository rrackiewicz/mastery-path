module.exports = {

  //TODO: POST since GET can't have BODY
  authorizeUser: (req, res) => {
    const dbInstance = req.app.get('db')
    const { email } = req.body

    dbInstance.authorize_user([ email ])
    .then((uid) => {
      res.status(200).send(uid[0])
    })
    .catch(() => {
      console.log(`No match for ${email}`)
      res.status(500).send()
    })
  }
}