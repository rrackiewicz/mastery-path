const bcrypt = require('bcryptjs')
const zxcvbn = require('zxcvbn')

//FIXME: zxcvbn mentions installing it locally instead of packing it if perforance issues arise

module.exports = {

  //TODO: Work on this next
  authorizeUser: (req, res) => {
    //console.log("LOGGING IN", req.body);
    const { username, password } = req.body
    //console.log("PASSWORD ", password);
    const dbInstance = req.app.get('db')
    dbInstance.read_hash([username])
    .then(([{ hash }]) => {
      //console.log("HASH ", hash);
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          console.log("Error comparing password")
          console.log(err)
          res.status(500).send(err)
        } else if (result) {
          dbInstance.read_user([ username, hash, null ])
          .then(user => {
            console.log("User returned: ", user)
              //massive always returns an array, so user is the only object in the array
              req.session.user = user[0].uid
              //copy user so uid remains on session after uid is deleted
              const newUser = {...user[0]}
              //don't need uid passed back to app as it is on session
              delete newUser.uid
              res.status(200).send(newUser)
          })
          .catch(err => {
              console.log(err);
              res.status(200).send(err)
          });
      } else {
        res.status(401).send({ username })
      }
      });
    })
    .catch(err => {
      err = err.toString()
      console.log(err)
      if (err.match(/Cannot match against/)) {
          res.status(401).json('invalid credentials')
      } else if (err.match(/Cannot destructure/)) {
          res.status(401).json('invalid username')
      } else {
          res.status(500).send({ err })
      }
    })
    },

    signUpUser: (req, res) => {
      const { first_name, last_name, username, email, password } = req.body
      const dbInstance = req.app.get('db')

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          //console.log(hash)
          dbInstance.new_user([first_name, last_name, username, email, hash])
            .then(user => {
                req.session.user = user[0].uid;
                console.log("Req.session.user = ", req.session.user)
                //console.log("Success signing up user")
                res.status(200).send();
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
        });
    });
    },

    verifyUser: (req, res) => {
      const { username } = req.params
      const dbInstance = req.app.get('db') 
      dbInstance.verify_user([ username ])
      .then(returnedUser => {
        res.status(200).send(returnedUser)
      })
      .catch(() => {
        res.status(500).send()
      })
    },

    verifyEmail: (req, res) => {
      const { email } = req.params
      const dbInstance = req.app.get('db') 
      dbInstance.verify_email([ email ])
      .then(returnedEmail => {
        res.status(200).send(returnedEmail)
      })
      .catch(() => {
        res.status(500).send()
      })
    },

    addMaster: (req, res) => {
      const uid = req.session.user
      const dbInstance = req.app.get('db') 
      dbInstance.new_master([ uid ])
      .then(mid => {
        console.log("Master created. MID: ", mid)

        res.status(200).send(mid[0])
      })
      .catch(() => {
        console.log("Adding master failure")
        res.status(500).send()
      })
    },

    validatePassword: (req, res) => {
      const { password } = req.body     
      res.status(200).send(zxcvbn(password))
    },

    resetPassword: (req, res) => {
      //when seeding, only username and newPassword are in the body
      //when resetting password through UI oldPassword is in the body
      let { username, newPassword, oldPassword } = req.body;
      //console.log("RESETTING PASSWORD");
      //console.log(req.body);
      const dbInstance = req.app.get('db') 
      dbInstance.read_hash([ username ])
        .then(([{ hash: oldHash }]) => {
          //console.log("OLD PASSWORD HASH");
          if (!oldHash) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newPassword, salt, (err, newHash) => {
                dbInstance.update_password([ username, newHash])
                  .then(user => {
                    req.session.user = user.id;
                    res.status(200).send(user);
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                  });
              });
            });
          } else {
            bcrypt.compare(oldPassword, oldHash, (err, result) => {
              if (err) {
                console.log(err)
                res.status(500).send(err);
              } else if (result) {
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newPassword, salt, (err, newHash) => {
                    req.db.update_password([ username, newHash])
                      .then(user => {
                        req.session.user = user.id;
                        res.status(200).send(user);
                      })
                      .catch(err => {
                        console.log(err);
                        res.status(500).send(err);
                      });
                  });
                });
              } else {
                res.status(400).json("bad request");
              }
            });
          }
      })
      .catch(err => {
          err = err.toString();
          console.log(err)
          if (err.match(/Cannot match against/)) {
              res.status(401).json('invalid credentials');
          } else {
              res.status(500).send({ err });
          }
      });
  }
}