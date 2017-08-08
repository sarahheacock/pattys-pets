const express = require("express");
const pageRoutes = express.Router();
const Page = require("../models/page").Page;
const mid = require('../middleware/middleware');

const configure = require('../configure/config');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


pageRoutes.param("pageID", (req, res, next, id) => {
  Page.findById(id, (err, doc) => {
    if(err) return next(err);
    if(!doc){
      err = new Error("Page Not Found");
      err.status = 404;
      return next(err);
    }
    req.page = doc;
    return next();
  });
});

pageRoutes.param("rateID", (req, res, next, id) => {
  const result = req.page.rates.id(id);
  if(!result){
    let err = new Error("Rate not Found");
    err.status = 404;
    return next(err);
  }
  req.rate = result;
  return next();
});


//===================GET SECTIONS================================
// pageRoutes.post('/', (req, res, next) => {
//   let page = new Page(req.body);
//   bcrypt.hash(page.password, 10, (err, hash) => {
//     if (err) {
//       return next(err);
//     }
//     page.password = hash;
//
//     page.save((err, page) => {
//       if(err){
//         err = new Error("Page not created");
//         err.status = 404;
//         return next(err);
//       }
//       res.status(201);
//       res.json(page)
//     });
//
//   });
// })


//get page
pageRoutes.get('/:pageID', (req, res, next) => {
  res.status(200);
  res.json({rate: req.page.rates});
});

//add rate
pageRoutes.post('/:pageID', mid.authorizeUser, mid.checkEditInput, (req, res, next) => {
  req.page.rates.push(req.body);
  req.page.save((err, page) => {
    if(err){
      let err = new Error("Unable to add new rate. Contact Sarah.")
      err.status = 500;
      next(err)
    }
    res.status(201);
    res.json({rate: page.rates});
  });
});

//get specific rates
pageRoutes.get('/:pageID/:rateID', (req, res, next) => {
  res.status(200);
  res.json({rate: req.rate});
});

//update rates
pageRoutes.put('/:pageID/:rateID', mid.authorizeUser, mid.checkEditInput, (req, res, next) => {
  Object.assign(req.rate, req.body);
  req.page.save((err,page) => {
    if(err){
      err = new Error("Unable to edit rate. Contact Sarah.");
      err.status = 500;
      return next(err);
    }
    res.status(200);
    res.json({rate: page.rates});
  });
})

//delete rate
pageRoutes.delete("/:pageID/:rateID", mid.authorizeUser, (req, res) => {
  req.rate.remove((err) => {
    req.page.save((err, page) => {
      if(err){
        err = new Error("Unable to delete rate. Contact Sarah.");
        err.status = 500;
        return next(err);
      }
      res.json({rate: page.rates});
    });
  });
});

module.exports = pageRoutes;
