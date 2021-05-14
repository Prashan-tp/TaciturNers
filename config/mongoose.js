const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatting_appdb');
const db = mongoose.connection ;
db.on('error', function(err) { console.log(err.message); });
db.once('open',function(){
    console.log('connected');
})