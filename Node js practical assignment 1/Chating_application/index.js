const express = require("express");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(server,{cors:{origin:"*"}});
const PORT = process.env.PORT || 3000;
const mongo = require("mongodb");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbname = "mongochat";


app.use(express.static(path.join(__dirname,"")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
})

server.listen(PORT,()=>{
    console.log(`Server is listening to PORT ${PORT}`);
});

// Connect to socket
io.on('connection',async (socket)=>{
    // User connection socket.id....
    console.log("User connected with : "+socket.id);

    // Connecting with MongoDB Database....
    await client.connect();
    console.log("Connection with MongoDB established.....");

    socket.on('message',(data)=>{
        console.log(data);
    });

    sendStatus = function(s)
    {
        socket.emit('status',s);
    }
      
    var db = client.db(dbname);
    var chat_data = db.collection("chats");
    var getResult = chat_data.find().toArray((err,res)=>{

        if(err)
        {
            throw err;
        }

        socket.emit('output',res);
    });
 
   
    socket.on('input',(data)=>{
        let name = "Dhawal Parmar";
        let message = data.message;

        if(message=="")
        {
            sendStatus("Please enter message....");
        }
        else
        {
            chat_data.insertOne({ name: name, message: message }, () => {
                socket.emit('output', [data]);

                sendStatus({
                    status: 'Got your message..',
                    clear: true
                });
            });
        }

    });

    socket.on('clear',(data)=>{
        chat_data.deleteMany({},()=>{
            socket.emit("cleared");
        });
    })
   

    // Database...
    // const db = client.db(dbname);
    // const collection = db.collection('chats');
   
    // Check data from collection
    // const getResult = await collection.find().toArray();
    // console.log(getResult);

});