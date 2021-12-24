const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.get("/video",(req,res)=>{
    const range = req.headers.range;
    if(!range)
    {
        res.status(400).send("Requires range headers....");
    }

    const videoPath = "your_video_file_name.mp4";
    const videoSize = fs.statSync("your_video_file_name.mp4").size;


    // Parse Range
    // Example : "Bytes 32324 - "

    const CHUNK_SIZE = 10**6; //1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLenght = end -start + 1;

    const headers = {
        'Content-Range':`bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges":"bytes",
        "Content-Length": contentLenght,
        "Content-Type":"video/mp4"
    };
    res.writeHead(206,headers);
    const videoStream = fs.createReadStream(videoPath,{start,end});
    videoStream.pipe(res);
});

app.listen(PORT,()=>{
   console.log(`Server is listening on PORT ${PORT}`); 
});
