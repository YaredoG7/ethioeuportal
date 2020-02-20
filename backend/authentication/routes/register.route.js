const passport = require("passport");
const user = require('../controllers/user.controller');
const User = require("mongoose").model("User");
const loginAccount = require('../../utils/portal.access.email');


var getErrorMessage = (err) => {

  var messgae = '';
  if (err.code){
      switch (err.code){
          case 11000:
          case 11001: 
            messgae = 'Duplicate record. Account already exists';
            break;
          default: 
            messgae = 'Something went wrong';
      }
  } else {
      for(var errName in err.errors){
          if (err.errors[errName].messgae) messgae = err.errors[errName].messgae;
      }
  }
  return messgae;
}

module.exports = function(router) { 
    router.post("/register", function(req, res, next) {
        passport.authenticate("local-signup", function(err, user, info) {
          if (err) {
            console.log(err)
            return next(err);
          }
          if (user) {
           
            res.status(409).send({ message: info.message });
            return;            
          }

          let vit_user = new User(req.body);  
        //  console.log(vit_user);
          let vitID = '';
          //  console.log(vit_user);
/*           User.userVitId(vitID, null, function(generatedId) {
            console.log('ima wordking');
            vit_user.vit_id = generatedId;
            vit_user.save((err, user) => {
                if (err) {
                    res.status(500).send({code: 500, message: err.message});   
                    console.log(err);
                    return;
                }
                  else {

                  // send email
                  
                  let mail = {
                    to: user.email,
                    subject: 'Ethio-EU Scholarship Portal Notification',
                  }
                  loginAccount(mail);
                  // successfully saved
                  res.status(201).send({code: 201, message: 'user has been registered successfully', data: user});
                  return;
                  }
            })
            // console.log(generatedId)
          } , err => {
            console.log(err)
          })*/
          User.userVitId(vitID, null, function(generatedId) {
            vit_user.vit_id = generatedId;
            vit_user.save((err, user) => {
                if (err) {
                    res.status(500).send({code: 500, message: err.message});   
                    // console.log(err);
                    return;
                }
                  else {

                  // send email
                  // console.log(user)
                  let mail = {
                    to: user.email,
                    subject: 'Ethio-EU Portal Notification',
                  }
                  loginAccount(mail);
                  // successfully saved
                  res.status(201).send({code: 201, message: 'user has been registered successfully'});
                  return;
                  }
            })
          })
        })(req, res, next);
      });


    router.get('/users', user.getAll)
          .get('/user/:email', user.getUser)
          .put('/user/:userId', user.updateUser)
          .delete('/user/:id', user.deleteUser)
          .put('/message/:userId', user.saveMessage)
          .get('/message/:userId', user.getMessage)
}