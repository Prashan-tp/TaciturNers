 const express = require("express");
const passport = require("passport");
 const router = express.Router();
 const homecontroller  = require('../controller/home_controller');
 router.get('/',homecontroller.display);
 router.get('/sign-in',homecontroller.sign_in);
 router.get('/sign-up',homecontroller.sign_up);
 router.get('/home', passport.checkAuthentication  ,homecontroller.home);
  router.get('/img-post',passport.checkAuthentication , homecontroller.image);
 router.post('/destroy',homecontroller.destroy);
 router.post('/upload', homecontroller.post);
  router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/sign-in'},
 ) , homecontroller.createSession);
  router.post('/create' ,homecontroller.create);
  //  router.get('/chat',passport.checkAuthentication ,homecontroller.chat)
 module.exports = router ;