const User = require("mongoose").model("User");
const async = require("async");

const HahuMail = require('../../utils/password.email');
const Notify = require('../../utils/general.email');
// const sms = require('../../utils/send.sms');



/************************************
 * Reset password users email
 *************************************/

exports.resetPassPhone = (req, res, next) => {
  async.waterfall(
    [
      function(done) {
        let token = Math.floor(Math.random() * 1000000);
        done(null, token);
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, (err, user) => {
          if (err) {
            return done(err);
          }
         // console.log(req.body.email)
          if (!user) {
            res.status(404).send({code: 404, message: "No user found with this email address" });
            return;
          }
          user.accessToken = token;
          user.tokenExpiry = Date.now() + 18000000;
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      async function(token, user, done) {

        // user has been found and the email is 
        let mail = {
          to: user.email,
          subject: "Ethio-EU Portal Notification",
          text: '',
          head:'This email is to notify you that you have requested a password reset for your Ethio-EU Portal Account',
          body: `
          Use Access Code: <h3 style="font-size: 16px; color: green; font-wight:700;">${token}</h3>
  
          If you were not the one who has made the changes please contact us as soon as possible`,
          footer: 'Best wishes from Ethio-EU Portal!'

        };

        // let success = Notify(mail);
        if ((user && user.phone !== undefined) || user.phone != null) {
          Notify(mail);
          res.status(200).json({ code: 200, message: "Message has been sent" });
        } else {
          res
            .status(500)
            .json({ error: "Something went while sending the email" });
        }
        next();
      }
    ],
    function(err) {
      if (err) return next(err);
      // res.status(200).json({message: 'OK'});
    }
  );
}

  /**************************
 * Save new password token and update password 
 **************************/

exports.saveNewPassword = (req, res, next) => {
    async.waterfall(
      [
        function(done) {
          User.findOne(
            {
              accessToken: req.params.access_code,
              tokenExpiry: { $gt: Date.now() }
            },
            function(err, user) {
              if (err) {
                return next(err);
              }
              if (!user) {
                res.json({
                  code: 404,
                  message: "Something went wrong, unable to save new password"
                });
              }
              user.password = req.body.password; // new password
              user.accessToken = undefined;
              user.tokenExpiry = undefined;
  
              user.save(function(err) {
                done(err, user);
              });
            }
          );
        },
        function(user, done) {
          let mail = {
            to: user.email,
            subject: "Ethio-EU Portal Notification",
            text: '',
            head:'This email is to notify you that you have successfully updated your password',
            body: 'If you were not the one who has made the changes please contact us as soon as possible',
            footer: 'Best wishes from Ethio-EU Portal!'

          };
  
          let success = Notify(mail);
  
          if (success) {
            res.status(201).json({ code: 201, message: "Email has been sent" });
          } else {
            res
              .status(500)
              .json({ error: "Something went while sending the email" });
          }
          done("done");
        }
      ],
      function(err) {
        if (err) return next(err);
        //  res.send("Redirecting...");
      }
    );
  };


  