
        var socket = io();
        socket.on('connect',function (){
          console.log('Connected to server');
          // socket.emit('createEmail',{
          //   to:'abc@example.com',
          //   text:'Helloooo m from client..how are you ??'
          // });
          socket.emit('createMessage',{
            from:"Naga",
            text:"Hellooo from client"
          });

        });
        socket.on('disconnect',function (){
          console.log('Disconnected from server');
        });
        // socket.on('newEmail',function(email){
        //   console.log('New email',email);
        // });
        socket.on('newMessage',function(message){
          console.log('new Message',message);
        });
