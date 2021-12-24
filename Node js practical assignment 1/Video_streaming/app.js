const fs= require("fs");
const http = require("http");
const PORT = process.env.PORT || 3000;
var server = http.createServer();

server.on("request",(req,res)=>{

    const fsReadStream = fs.createReadStream("data1.txt");

    fsReadStream.on('data',(chunkdata)=>{
        res.write(chunkdata);
    });

    fsReadStream.on('end',()=>{
        res.end();
    });

    fsReadStream.on('error',(err)=>{
        console.log(err);
        res.end("File doesn't exist or file path has been moved.....");
    });

});

server.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
});