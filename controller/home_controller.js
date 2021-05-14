const info = require('../model/info') ;
const post = require('../model/post');
const Post = require('../model/post') ;


module.exports.create=function(req,res){
  info.findOne({email:req.body.email},
  function(err,data)  {
    if(data){
      return res.redirect('/');
    }
  
   info.create({
       name:req.body.name , 
       email:req.body.email ,
       password : req.body.password ,
       number: req.body.number

   } , function (err,newinfo){
  if(err){
      console.log("create");
  }
  return res.redirect('/');
   });
  });
}
module.exports.sign_up = function(req,res){
  return res.render('sign_up');
}
module.exports.sign_in = function(req,res){
  return res.render('sign_in');
}
module.exports.display=function(req,res){
  info.find({},function(err,info){
    if(err){
      console.log("display");
    }
    return res.render('display' , {
      infolist:info
    });
  });
}
module.exports.home = function(req,res){
  
  post.find({user:req.user._id} ,function(err,post){
if(err){
  console.log(err);
}
if(post.length>0){
return res.render('home' ,{
    post:post[post.length-1]
});
}else{
  return res.render('home' ,{
    post:post
});
}
  });
}

module.exports.createSession = function(req,res){
  return res.redirect('/home');
}
module.exports.destroy=function(req,res){
  req.logout();
  return res.redirect('/');
}
module.exports.image=function(req,res){
  return res.render('post');
}

module.exports.post=function(req,res){
  var path2 =   Post.avatarPath.replace("\\", "/");
  Post.uploadedAvatar(req,res,function(err){
    if(err){
      console.log('*****Multer Error: 1' );
    }
    
    console.log("8888"+ req.user._id);
    Post.create({
      avatar : path2 + '/' + req.file.filename ,
      user :  req.user._id
     
    },function(err,newpost){
      if(err){
        console.log("kkj");
      }
      
      
      return res.redirect('/home');
    });
       
      });
}
module.exports.chat=function(req,res){
  return res.render('chattingbox')
  
}















