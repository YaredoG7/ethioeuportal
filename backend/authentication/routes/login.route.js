const passport = require("passport");
const jwt = require("jsonwebtoken");
const useragent = require("useragent");
const request = require('request')

// email sending module
const hahuMail = require('../../utils/send.email');
// geo location api key
const ipInfoApiKEy = 'b2d477dbad9d4d';

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
    router.post('/login',  function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "All fields are required." });
          }
          passport.authenticate('local-login', function(err, user, info) {
              if (err) { return next(err)};
              if (!user) {
                  res.status(401).send({code: 401, message: info.message})
                  return;
              }

              req.session.user_info = user;
              // save user data after auth 
              res.cookie('ET_EU_ID', user.vit_id, {
                     httpOnly: true,
                     maxAge: 60 * 60 * 24 * 7 // 1 week
              })

            req.logIn(user, function(err) {
                if (err) {
                  res.status(500).send({code: 500, message: getErrorMessage(err)});   
                  return;
                  }

              let secret = process.env.JWT_SECRET || 'secret';
              const token = jwt.sign({role: 'vit_portal_user'}, secret);
              // res.header('vtc-api-token', token);
              res.status(200).send({code: 200, message: 'Success!',  data: user, token: token});
              return;
            })
          })(req, res, next);
    });
 }
