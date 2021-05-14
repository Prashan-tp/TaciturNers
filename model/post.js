const mongoose = require('mongoose');
const multer =  require('multer');
const path = require('path');
const Avatar_Path = path.join('/uploads-img') ;
const postSchema = new mongoose.Schema({
    avatar:{
        type:String
    },
     user:{
        type: mongoose.Schema.Types.ObjectId ,
         ref : 'infos'
     }
});
let storage = multer.diskStorage({
    destination:function(req,file,callback){
        console.log(Avatar_Path +"m");
        callback(null,path.join(__dirname, '..', Avatar_Path)) ;
    },
     filename:function(req,file,callback){
         console.log(file.fieldname+"88888888")
         callback(null,file.fieldname+'-'+Date.now())
     }
});

postSchema.statics.uploadedAvatar=multer({storage:storage}).single('image');
postSchema.statics.avatarPath = Avatar_Path ;
const post = mongoose.model('Post',postSchema);
module.exports=post ;