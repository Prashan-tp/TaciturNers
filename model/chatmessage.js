const mongoose = require('mongoose');
const chat_messageSchema = new mongoose.Schema({
    message:{
        type:String
    },
    user_email:{
        type:String
    }
});
const chat = mongoose.model('Chat',chat_messageSchema);
module.exports=chat ;