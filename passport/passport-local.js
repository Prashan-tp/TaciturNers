const passport = require('passport');

const localStrategy = require('passport-local').Strategy ;
const info = require('../model/info');
passport.use(new localStrategy({
    usernameField:'email'
},
function(email,password,done){
info.findOne({email : email},function(err,info){
    if(err){
        console.log(err);
    }
    if(!info || info.password!=password){
        return done(null,false );
    }
    return done(null,info);
});

passport.serializeUser(function(info,done){
    
   console.log(info.id);
    done(null,info.id);
});
passport.deserializeUser(function(id,done){
    
 info.findById(id, function(err, info){
    
        if(err){
            return done(err);
        }
        return done(null,info);
    });
});
}
));

passport.checkAuthentication=function(req,res,next){
    console.log("*************");
    console.log(req.isAuthenticated());
     console.log(req);
    if(req.isAuthenticated()){
        return next();
     }
     return res.redirect('/sign-in');
 }
 
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        
        res.locals.user = req.user;
        
    
     }

     next();
 }
module.exports=passport ;