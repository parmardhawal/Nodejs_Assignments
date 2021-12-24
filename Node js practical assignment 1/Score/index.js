const fs=require("fs");
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const PORT = process.env.PORT||3000;
const io = require("socket.io")(server,{cors:{origin:"*"}});



app.use(express.static(path.join(__dirname,"index.html")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

server.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`); 
});

io.on("connection",(socket)=>{
   var json_file = fs.readFileSync("./score.json");
   
   var data = JSON.parse(json_file);
   console.log(data);
   io.emit('output',data);

});