module.exports = {

  //TODO: GET with :postID on params
  getResults: (req, res) => {
    const dbInstance = req.app.get('db')
    const { searchid } = req.params
    dbInstance.get_results([ searchid ])
    .then((results) => {
      res.status(200).send(results)
    })
    .catch(() => res.status(500).send())
  }
}