const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const fileUpload = require("express-fileupload");

require('./config/db/db');
require('./authentication/config/passport')(passport);
const authRoute = require('./authentication/routes/auth.routes');
const fileUplaod = require('./app/upload/upload.routes');
const euCntr = require('./app/eu-country/eu.country.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors({origin: [
    "http://localhost:4200",

  ], credentials: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true 
}));

const shh = process.env.SESSION_SECRET || 'secret';
app.use(session({
    saveUninitialized: true, 
    resave: true, 
    secret: shh
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload())

const isAuthenticated = function  (req, res, next) {
  let token = req.headers.authorization
  // var t = new Date();
  // t.setSeconds(t.getSeconds() + 5);      
  // req.requestTime = new Date().setSeconds(t);
  // console.log(req.headers.authorization)
  let secret = process.env.JWT_SECRET || 'secret';
  if (token) {
    // console.log(jwt.verify(token, secret).role)
    // if(jwt.verify(token, secret).role === '') {
      next()
    // }
  } else {
    res.status(500).send({code: 500, message: 'Not Authenticated'})
    return;
  }
}
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/files', fileUplaod);
app.use('/api/v1/eu_countries', euCntr);


// http.listen(4444, () => {
//   // console.log('web socket pool is open in port 4444')
// });

app.listen(3000, () => {
    // console.log('server started on 3000')
});

