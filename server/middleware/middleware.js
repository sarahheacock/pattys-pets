const superSecret = require('../configure/config').secret;
const jwt = require('jsonwebtoken');

const messageData = require('../../data/data').messageData;
const editData = require('../../data/data').editData;
const loginData = require('../../data/data').loginData;
const notRequired = require('../../data/data').notRequired;
const messages = require('../../data/data').messages;


//============input functions==========================

const checkForm = (obj, form) => {
  return (Object.keys(form)).reduce((a, b) => {
    const required = notRequired.reduce((c, d) => { return c || b === d }, false);

    const result = a && ((obj[b] !== '' && obj[b] !== undefined && obj[b].length !== 0) || required);
    return result;
  }, true);
};


const checkPhone = (num) => {
  const newNum = num.split('').filter((n) => {
    const digit = parseInt(n);
    if(n !== NaN) return digit;
  }).join('');
  //make sure num has <= 11 digits but >= 10 digits
  //10^9 = 100 000 0000
  //2 * 10^10 - 1 = 1 999 999 9999
  return newNum <= (2 * Math.pow(10, 10) - 1) && newNum >= Math.pow(10, 9);
};

const checkEmail = (mail) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(mail);
};

//==========output========================================
const checkMessageInput = (req, res, next) => {

  const cForm = checkForm(req.body, messageData);

  if(!cForm){
    let err = new Error(messages.inputError);
    err.status = 400;
    return next(err);
  }
  else {
    const cPhone = checkPhone(req.body.phone);
    const cEmail = checkEmail(req.body.email);

    if(!cPhone){
      let err = new Error(messages.phoneError);
      err.status = 400;
      return next(err);
    }
    else if(!cEmail){
      let err = new Error(messages.emailError);
      err.status = 400;
      return next(err);
    }
  }

  return next();
};


const checkEditInput = (req, res, next) => {

  const cForm = checkForm(req.body, editData);

  if(!cForm){
    let err = new Error(messages.inputError);
    err.status = 400;
    return next(err);
  }

  return next();
};


const checkLoginInput = (req, res, next) => {

  const cForm = checkForm(req.body, loginData);

  if(!cForm){
    let err = new Error(messages.inputError);
    err.status = 400;
    return next(err);
  }

  return next();
};

// verifies token after login
const authorizeUser = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) { // decode token
    jwt.verify(token, superSecret, function(err, decoded) { // verifies secret and checks exp
      if (err) {
        let err = new Error(messages.expError);
        err.status = 401;
        next(err);
      }
      else { // if everything is good, save to request for use in other routes
        if(decoded.userID !== req.page.userID){
          let err = new Error(messages.authError);
          err.status = 401;
          return next(err);
        }
        next();
      }
    });
  }
  else {
    let err = new Error(messages.tokenError);
    err.status = 401;
    next(err);
  }
};



module.exports = {
  checkLoginInput,
  checkMessageInput,
  checkEditInput,
  authorizeUser
};
