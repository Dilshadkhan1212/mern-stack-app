const express = require("express");
const app = express();
const cors = require("cors");
const fs=require('fs')
const status=require('express-status-monitor')



app.use(cors()); 

app.use(status())

app.get('/', (req, res) => {
   const stream=fs.createReadStream('./largefile.txt','utf-8');
   stream.on('data',(chunk)=>res.write(chunk));
   stream.on('end',()=>res.end()); 
});

app.listen(5000,()=>{
    console.log(`Server is running on port 5000`)
}) 