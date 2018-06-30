require('dotenv').config()
const express = require('express')
  , session = require('express-session')
  , massive = require('massive')
  , bodyParser = require('body-parser')
  , axios = require('axios')
  , sc = require('./controllers/search_controller')
  , pc = require('./controllers/path_controller')
  , uc = require('./controllers/user_controller')
  , rc = require('./controllers/resource_controller')
  // , path= require('path') //for Browser Router only

const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING
} = process.env

const app = express();

// app.use( express.static( `${__dirname}/../build` ) )

app.use(bodyParser.json())

massive(CONNECTION_STRING)
  .then(dbInstance => {
      //Comment out the next line to not seed the database
      reset(dbInstance);
      console.log("Connected To Database");
      app.set('db', dbInstance);
  })
  .catch(err => {
      console.error("Database Error");
      console.error(err);
  });

function reset(dbInstance) {
  dbInstance.seedFile()
    .then(users => {
      console.log("We be SEEDED!")
      //console.log(users)
      Promise.all([
        ...users.map(({ username }) => {
            return axios.put('http://localhost:4000/api/auth/reset', { username, newPassword: username });
        })
      ])
        .then(responses => console.log(responses.map(({ data }) => data), "done refreshing db"))
        .catch(console.error)
    })
    .catch(console.error)
}

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

//DESERIALIZE 
app.use((req, res, next) => {
  const uid = req.session.user;
  //console.log("UID: ", uid)
  if (uid) {
    //console.log("GETTING USER: " + uid);
    const dbInstance = req.app.get('db')
    dbInstance.read_user([ null, null, uid ])
      .then(user => {
        //console.log("Success reading user")
        req.user = user;
        next();
      })
      .catch(err => {
          console.log("Error reading user")
          res.status(500).send(err);
      });
  } else next();
});

exports.awaitUser = function awaitUser(req, res, next) {
  // if (!req.session.user) {
  if (!req.user || !req.user.uid) {
      res.status(401).json("unauthorized");
  } else next();
}

exports.requireAdmin = function requireAdmin(req, res, next) {
  if (!req.session.user || !req.user || !req.user.admin) {
      res.status(403).json("forbidden");
  } else next();
}

app.get('/api/resource/:url', pc.getUrlData)
app.get('/api/search/:searchid', sc.getResults)
app.get('/api/paths/:pid', pc.getPath)
app.post('/api/paths', pc.createPath)
app.post('/api/paths/:pid/:mid', pc.assignPath)
app.post('/api/master', uc.addMaster)
// app.post('/api/apprentice', uc.addApprentice)

//FIXME: Right now, this functionality is for the first save which creates table entries in the database. For subsequent uploads, the tables have to be cleared of entries with the same pid so as not to create duplication of data. I should probably update this to a PUT even though it is technically a post.
app.put('/api/paths', pc.uploadPath)
app.post('/api/auth/login', uc.authorizeUser)
app.put('/api/auth/reset', uc.resetPassword)
app.post('/api/auth/verifyuser/:username', uc.verifyUser)
app.post('/api/auth/verifyemail/:email', uc.verifyEmail)
app.post('/api/auth/validatepassword', uc.validatePassword)
app.post('/api/auth/signup', uc.signUpUser)
//TODO: Implement these
// app.post('/api/auth/logout', uc.logoutUser)

// app.get('/api/auth/me', uc.getCurrentUser)
app.get('/api/masterpaths', pc.getMasterPaths)
app.get('/api/apprenticepaths', pc.getApprenticePaths)
// app.delete('/api/paths/:uid', pc.deletePath)
// app.put('/api/paths/:uid', pc.updatePath)

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// }); //only using this with BrowserRouter

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`)
})

