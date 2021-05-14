const mongoose = require('mongoose');
const chat_imageSchema  = new mongoose.Schema({
    site:{
        type:String
    },
    user_email:{
        type:String
    }

});
const image = mongoose.model('Imagechat',chat_imageSchema);
module.exports=image ;