const express = require("express");
const app =  express();
const {PORT = 3000} = process.env;
const socket = require("socket.io");
const cors = require("cors");



const server = app.listen(PORT,()=>{
    console.log(`Server is listening to PORT ${PORT}`);
});


const io = socket(server);

app.use(function(req,res,next){
    
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");

    res.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,DELETE");


    
    next();
});

app.use(cors({origin:"http://localhost:4200"}));


io.on("connection",(socket)=>{
    console.log(`new Connection ${socket.id}`);

    socket.on('chat',(data)=>{
        io.sockets.emit("chat",data);
    });

    socket.on('typing',(data)=>{
        io.sockets.emit("typing",data)
    })
});