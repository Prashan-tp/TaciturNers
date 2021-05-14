const mongoose = require('mongoose');

const chat_roomSchema = new mongoose.Schema({
     chatroom:{
        type:String
    }, 
    chat:[
        {type:mongoose.SchemaTypes.ObjectId,
         ref :'Chat'
        }
    ],
    image:[
        {type:mongoose.SchemaTypes.ObjectId,
        ref:'Imagechat'
        }
    ]
});
const chatroom = mongoose.model('Chatroom',chat_roomSchema);
module.exports=chatroom ; 