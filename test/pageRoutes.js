//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const messages = require("../data/data").messages;
const Page = require('../server/models/page').Page;
const jwt = require('jsonwebtoken');
const configure = require('../server/configure/config');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Pages', () => {

  beforeEach((done) => { //Before each test we empty the database
    Page.remove({}, (err) => { done(); });
  });

  describe('/POST page', () => {
    const page = {
      username: "test",
      password: "password"
    };

    it('it should create a new page rates', (done) => {
      chai.request(server)
      .post('/page')
      .send(page)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.rates[0].services.should.eql(
          {
            "Pet Sitting": true,
            "Dog Walking": true,
            "Care and feeding": true,
            "Waste pick up and disposal": true,
            "Medication administration": true,
            "Brushing/Combing": true,
            "Transportation": true,
            "House sitting": true,
            "Collect mail": true,
            "Water plants": true,
            "Alter lights and shades": true
          }
        );
        res.body.should.have.property('username').eql(page.username);
        res.body.should.have.property('password');
        done();
      });
    });
  });

  describe('/GET/:id page', () => {
    it('it should return error if page not found', (done) => {
      chai.request(server)
      .get('/page/594952df122ff83a0f190050/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error').eql({message: "Page Not Found"});
        done();
      });
    });

    it('it should GET a page by the given id but only return needed info', (done) => {
      const page = new Page({username: "test", password: "password"});

      page.save((err, page) => {
        chai.request(server)
        .get('/page/' + page.id)
        .send(page)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('rate');
          done();
        });
      });
    });
  });

  describe('/POST rate to pageID', () => {
    let page;
    beforeEach((done) => { //Before each test we empty the database
      page = new Page({
        "username": "test",
        "password": "password"
      });

      page.save((err, newPage) => { done(); });
    });


    it('add rate when all form items are filled', (done) => {
      const token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });

      const rate = {
        "services": {
          "Pet Sitting": true,
          "Dog Walking": true
        },
        "description": "Good for...",
        "title": "Pampered Paws",
        "time": "10 minutes",
        "cost": "10",
        "token": token
      };

      chai.request(server)
      .post('/page/' + page.id)
      .send(rate)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('rate');
        res.body.rate[1].should.have.property('cost').eql("10");
        done();
      });
    });

    it('should return an error if required not included', (done) => {
      const token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });

      const invalid = {
        "description": "Good for...",
        "title": "Pampered Paws",
        "token": token
      };

      chai.request(server)
      .post('/page/' + page.id)
      .send(invalid)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql({message: messages.inputError});
        done();
      });
    });

    it('should return an expired session if token is wrong', (done) => {
      const token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });

      const rate = {
        "services": [
          {
            "offered": true,
            "service": "Pet Sitting"
          }
        ],
        "description": "Good for...",
        "title": "Pampered Paws",
        "time": "10 minutes",
        "cost": "10",
        token: "vbnm"
      };

      chai.request(server)
      .post('/page/' + page.id)
      .send(rate)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql({message: messages.expError});
        done();
      });
    });

    it('should return unauthorized if no token provided', (done) => {
      const rate = {
        "services": {
          "Pet Sitting": true,
          "Dog Walking": true
        },
        "description": "Good for...",
        "title": "Pampered Paws",
        "time": "10 minutes",
        "cost": "10"
      };

      chai.request(server)
      .post('/page/' + page.id)
      .send(rate)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql({message: messages.tokenError});
        done();
      });
    });
  });

  describe('/PUT rate to rateID', () => {
    //AUTHENTICATION WAS NOT INCLUDED SINCE TESTED IN POST

    let page;
    beforeEach((done) => { //Before each test we empty the database
      page = new Page({
        "username": "test",
        "password": "password"
      });

      page.save((err, newPage) => { done(); });
    });


    it('edit rate when all form items are filled', (done) => {
      const token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });

      const rate = {
        "services": {
          "Pet Sitting": true,
          "Dog Walking": true
        },
        "description": "Good for...",
        "title": "Pampered Paws",
        "time": "10 minutes",
        "cost": "10",
        "token": token
      };

      chai.request(server)
      .put('/page/' + page.id + "/" + page.rates[0].id)
      .send(rate)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('rate');
        res.body.rate[0].should.have.property('cost').eql("10");
        done();
      });
    });

    it('should return an error if required not included', (done) => {
      const token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });

      const invalid = {
        "description": "Good for...",
        "title": "Pampered Paws",
        "token": token
      };

      chai.request(server)
      .put('/page/' + page.id + "/" + page.rates[0].id)
      .send(invalid)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql({message: messages.inputError});
        done();
      });
    });
  });

  describe('/DELETE rate to rateID', () => {
    //AUTHENTICATION WAS NOT INCLUDED SINCE TESTED IN POST

    let page;
    beforeEach((done) => { //Before each test we empty the database
      page = new Page({
        "username": "test",
        "password": "password"
      });

      page.save((err, newPage) => { done(); });
    });


    it('should delete rates', (done) => {
      const token = jwt.sign({userID: page.userID}, configure.secret, {
        expiresIn: '1d' //expires in one day
      });

      chai.request(server)
      .delete('/page/' + page.id + "/" + page.rates[0].id + "?token=" + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('rate')
        res.body.rate.should.be.a('array').length(0);
        done();
      });
    });
  });
});
