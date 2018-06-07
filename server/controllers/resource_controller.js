const og = require('open-graph')
module.exports = {
  getUrlData(req, res) {
    const { url } = req.params
    og(url, function(err, meta){
      console.log(url, meta)
      res.status(200).send(meta)
    })
  }
}