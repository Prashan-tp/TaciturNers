const { chat } = require('../controller/home_controller');

const Chatroom = require('../model/chatroom');
const Chat = require('../model/chatmessage');
const ChatImage = require('../model/chatimage');
module.exports.chatSocket=function(chatServer){
    let io = require('socket.io')(chatServer)
    io.sockets.on('connection',function(socket){
        console.log("connection",socket.id);
        socket.on('disconnect',function(){
            console.log('disconnected')
        }) ;
        socket.on('join_room',function(data){
            console.log('joining request rec.', data);
           Chatroom.findOne({chatroom:data.chatroom},function(err,user){
               if(user){
                   console.log(user+"!!!!!!!!!!!!!!!!!!!!!!!!1");
                   for(var i of user.chat){
                       Chat.findById(i,function (err,info) {
                           console.log(info+"6666666666");
                           socket.emit('recieve_message',info);
                       }) ;
                    }
                    for(var i of user.image){
                       ChatImage.findById(i,function (err,info) {
                        // console.log(info+"6666666666");
                        socket.emit('recieve_image',info);
                    }) ;
                   }
               }
              else if(!user){
                Chatroom.create({
                    chatroom: data.chatroom ,
                    
                },(err,info)=>{
                    if(err){
                        console.log(err+"]]]]]]");
                    }
                   
                });
               }
           }) 
            
            
            socket.join(data.chatroom);
            // console.log(io);
             io.in(data.chatroom).emit('user_joined',data);
        })
        socket.on('send_message',function(data){
            Chat.create({
                message:data.message ,
                user_email:data.user_email 
            },function(err,inf){
            
            if(err){
                console.log(err+"[[[[[[[");
            }
            Chatroom.findOne({chatroom:data.chatroom},function (err,user) {
                if(err){
                    console.log(err);
                }
                    user.chat.push(inf._id);
                    user.save();
                console.log(user+"dfiadvjisvvisjvsivjs0");
                
            });
            
        }); 
              console.log('sendedmessage',data)
            io.in(data.chatroom).emit('recieve_message',data);
                }) ;
                socket.on('send_image',function(data){
                   ChatImage.create({
                      site:data.site,
                      user_email:data.user_email 
                   },function(err,info){
                    if(err){
                        console.log(err+"[[[[[[[");
                    }
                    Chatroom.findOne({chatroom:data.chatroom},function (err,user) {
                        if(err){
                            console.log(err);
                        }
                            user.image.push(info._id);
                            user.save();
                        // console.log(user+"dfiadvjisvvisjvsivjs0");
                        
                    });
                   });
                    io.in(data.chatroom).emit('recieve_image',data);
                });
            
        }) ;
    
    
}