
class ChatEngine{
   
    constructor(chatBoxID , useremail ){
        this.chatBoxID = `document.getElementById('chatBoxID')`
        this.useremail = useremail ;
        this.socket=io.connect('http://localhost:5000');
        if(this.useremail){
        
        this.connectionHandler();
    }

 } 

     
    connectionHandler() {
        
        self=this ;
        this.socket.on('connect',function(){
        });
            
        const chatrooming = document.getElementById('chatroom');
        chatrooming.addEventListener('click',function(e){
          e.preventDefault();
         let  val =document.getElementById('chatter').value ;
         console.log(val);
       
         self.socket.emit('join_room',{
             user_email:self.useremail ,
             chatroom:val
         
        }) ;
         self.socket.on('user_joined',function(data){
            console.log("userjoined",data +"77777");
         });
     
         const sendmessage =  document.getElementById('send-message');
         sendmessage.addEventListener('click',function(e){
             e.preventDefault();
             let msg = document.getElementById('chat-message-input') ;
             let text_msg= msg.value
             console.log(text_msg);
             if(text_msg!=''){
                 self.socket.emit('send_message' ,{
                     message:text_msg ,
                     user_email:self.useremail ,
                     chatroom:val
                 })
             }
            });
            const sendimage = document.getElementById("chat-image")
            sendimage.addEventListener("change",function(e){
                // console.log(e);
                // console.log('<<<<<<<<<<<<<<<<<');
                // console.log(e.target.files[0]);
                
                var readerfile = new FileReader();
                readerfile.readAsDataURL(e.target.files[0]);
                readerfile.onload =function(event){
                   let srcdata = event.target.result ;
                    // console.log('******************');
                    // console.log(srcdata);
                
                 
               
                // console.log('******************');
                // console.log(srcdata);
                if(srcdata!=''){
                   self.socket.emit('send_image' ,{
                       site:srcdata,
                       user_email:self.useremail ,
                       chatroom:val
    
                   });
                }
            }
         }) ;
        }) ;
         self.socket.on('recieve_message',function(data){
             console.log('>>>>>>>>>>>>>>>>>>>>>>>>>.');
             console.log(data.user_email+"888989");
             let recieve_msg = document.createElement('li');
             let messagetype= 'other-message' ;
             if(data.user_email==self.useremail){
                messagetype = 'self-message';
             }
             var para = document.createElement('span');                       
                var t = data.message  ;
                console.log(para);

                   para.append(t);
                  recieve_msg.classList.add(messagetype);  
             
                   recieve_msg.append(para);
                   document.getElementById('chat-messages-list').append(recieve_msg);
                 
         });
         self.socket.on('recieve_image',function(data){
            let imagetag = document.createElement('img');
            let messagetype= 'other-message' ;
             if(data.user_email==self.useremail){
                messagetype = 'self-message';
             }
            imagetag.setAttribute("src",data.site);
            imagetag.setAttribute("height",'90p');
            imagetag.classList.add(messagetype);  
            console.log(imagetag);
            document.getElementById('chat-messages-list').append(imagetag);
         });
       
        
  
         
        
     
    }
 
 }