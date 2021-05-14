const mongoose = require("mongoose");
const infoSchema = new mongoose.Schema({
    name:{
        type:String ,
        require:true 
    },
    email:{
        type:String,
        require:true
    },
    password :{
       type:String,
       require:true 
    },
    number:{
        type:Number,
        require:true
    }
    
});
const info=mongoose.model('info',infoSchema) ;
    module.exports=info;