require('dotenv').config()
const express = require('express')
  // , session = require('express-session')
  // , passport = require('passport')
  // , Auth0Strategy = require('passport-auth0')
  , massive = require('massive')
  , bodyParser = require('body-parser')
  , sc = require('./controllers/search_controller')
  , pc = require('./controllers/path_controller')

const {
  SERVER_PORT,
  // SESSION_SECRET,
  // DOMAIN,
  // CLIENT_ID,
  // CLIENT_SECRET,
  // CALLBACK_URL,
  CONNECTION_STRING
} = process.env

const app = express();

app.use(bodyParser.json())

massive(CONNECTION_STRING).then((dbInstance) => {
  dbInstance.seedFile()
  .then(res => console.log('We be SEEDED!'))
  .catch(err => console.log(err))

  console.log('Database connected')
  app.set('db', dbInstance)
}) //can add a .catch here to display an error message

//Order is important
// app.use(session({
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }))

//Must come after session
// app.use(passport.initialize())

//Must come after initialize
// app.use(passport.session())

//at this point create a new application in Auth0
//be sure to paste callback in .evn and in Auth0 Allowed Callback URLs field
// passport.use(new Auth0Strategy({
//   domain: DOMAIN,
//   clientID: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   callbackURL: CALLBACK_URL,
//   scope: 'openid profile'
// }, (accessToken, refreshToken, extraParams, profile, done) => {
//   //done(null , profile); //Put this in here for testing before doing db calls
//   let db = app.get('db') //Add this after you have set up database
//   const {displayName, picture, id} = profile
//   db.find_user([id])
//     .then(foundUser => {
//       //if there is a user it will return an array of length 1, otherwise empty array
//       if (foundUser[0]) {
//         done(null, foundUser[0].id)
//       } else {
//         db.create_user([displayName, picture, id])
//         .then(user => {
//           done(null, user[0].id) //response from massive always returns an array
//         })
//       }
//     })
// }))

//stores profile in session store
//before adding in the database all "id" were called "profile" because
//now we are only storing the user_id in the session store
// passport.serializeUser((id, done) => {
//   done(null, id)
// })

//retrieves profile from session store when we hit an endpoint
// passport.deserializeUser((id, done) => {
//   //whatever we pass out, ends up on req.user
//   app.get('db').find_session_user([id])
//     .then(user => {
//       done(null, user[0]) //db data is retrieved as an array
//     })
//   //done(null, id) //this was here before we did the db search
// })


//ENDPOINTS
// app.get('/login', passport.authenticate('auth0'))

// app.get('/auth/callback', passport.authenticate('auth0', {
//   successRedirect: 'http://localhost:3000/#/private' //don't forget to add proxy to package.json
//   //put failure redirect here
// }))

//This endpoint is here just to see if req.user is in 
//the session store
// app.get('/auth/me', (req, res) => {
//   //deserialize makes req.user a truthy value
//   if(req.user) {
//     res.status(200).send(req.user)
//   } else {
//     res.status(401).send('nice try suckkkkka')
//   }
// })

app.get('/api/search/:searchid', sc.getResults);
app.post('/api/paths', pc.createPath);
app.post('/api/paths/:pid/:mid', pc.assignPath);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port: ${SERVER_PORT}`)
})
