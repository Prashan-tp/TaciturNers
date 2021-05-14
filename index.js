const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000 ;
const app = express();
const db = require('./config/mongoose');

 const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./passport/passport-local');

const path = require('path');
 const expressLayouts = require('express-ejs-layouts');
 

 app.use(express.urlencoded());
 app.use(cookieParser()) ;
 app.use(expressLayouts);
 
 
 app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'info',
    secret:'blahsomething',
    saveUninitialized:false , 
    resave:false ,
    cookie:{
        maxAge:(1000*60*100)
    }
})) ;
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/uploads-img', express.static(__dirname + '/uploads-img'));
app.use('/',require('./router'));
app.use('/javascript' ,express.static(__dirname + '/javascript'));
app.use('/assets' ,express.static(__dirname + '/assets'));

 const chatServer = require('http').Server(app);
 const chatSockets = require('./config/chat_engine').chatSocket(chatServer);
 chatServer.listen(5000);
 console.log('chat server is listening on port 5000');
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

