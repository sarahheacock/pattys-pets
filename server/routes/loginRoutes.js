const express = require("express");
const loginRoutes = express.Router();
const mid = require('../middleware/middleware');

const configure = require('../configure/config');
const Page = require("../models/page").Page;
const jwt = require('jsonwebtoken');

//================LOGIN==================================
//admin login
loginRoutes.post('/', mid.checkLoginInput, (req, res, next) => {
  Page.authenticate(req.body.username, req.body.password, (err, user) => {
    if(err) return next(err);

    const token = jwt.sign({userID: user.userID}, configure.secret, {
      expiresIn: '1d' //expires in one day
    });

    res.status(200);
    res.json({user: {token: token}});
  });
});



module.exports = loginRoutes;
